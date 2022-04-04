// import { getVideos } from '$db/get-videos';
// import { putVideo } from '$lib/api/put-video';
import type { Video } from '@repo/db';
import { derived, get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { videosService } from '$lib/api/videos';
import type { DataOrError, Nullable } from '@repo/shared';
// import axios from 'axios';
// import { API_HOST } from '$lib/api/config';

// https://www.arzidava.com/blog/svelte-custon-and-derived-stores/

// https://willwillems.com/posts/store-design-in-svelte.html
/* eslint-disable-next-line no-secrets/no-secrets */
// https://svelte.dev/repl/939579262de34b00b97873f2e61cd3b0?version=3.19.2
// https://docs.gitlab.com/ee/development/fe_guide/vuex.html

// https://monad.fi/en/blog/svelte-custom-stores/
// https://hamiltonulmer.com/changelog/local-first-backend-stores

const getTimestampNow = (): string => new Date().toISOString();

const createVideosStore = () => {
	const store = writable<Video[]>();
	const { subscribe, set, update } = store;

	type LoadOptions = {
		overwrite?: boolean;
	};
	const load = async (options?: LoadOptions, doAfter?: () => void) => {
		// only load if overwrite is true or videos have not yet been populated.
		if (options?.overwrite || !get(store)) {
			const data = await videosService.getAll();
			set(data);
		}

		if (doAfter) doAfter();
	};

	const updateVideo = async (video: Video) => {
		update((currentState) =>
			currentState.map((currentVideo) => (currentVideo.id === video.id ? video : currentVideo))
		);

		return await videosService.put(video);
	};

	const getById = (id: string) => get(store).find((video) => video.id === id);

	const getDrafts = () => get(store).filter((currentVideo) => !!currentVideo.is_draft_of);

	/* Return false if failed or parentId if successful */
	const mergeDraft = async (draft: Video): Promise<Nullable<Video>> => {
		if (!draft) {
			console.error('Failed to merge draft because draft data was missing.');
			return;
		}
		if (!draft.id) {
			console.error('Failed to merge draft because draft.id was missing.');
			return;
		}
		if (!draft.is_draft_of) {
			console.error('Failed to merge draft because draft.is_draft_of was missing.');
			return;
		}

		const draftId = draft.id;
		const parentId = draft.is_draft_of;

		let mergedDocument: Nullable<Video>;
		let databaseSuccess = false;

		update((currentState) =>
			currentState
				// overwrite original with draft
				.map((currentVideo) => {
					// NOTE: we only want to merge once, and ignore the rest if there are duplicates.
					if (currentVideo.id === parentId && !mergedDocument) {
						mergedDocument = { ...draft, id: parentId, is_draft_of: undefined };

						return mergedDocument;
					}

					return currentVideo;
				})
				// remove draft from videos
				.filter((currentVideo) => currentVideo.id !== draftId)
		);

		// if local merge succeeded, do to database
		if (mergedDocument) {
			const maybePutData = await videosService.put(mergedDocument);

			// if data was successfully put, then delete draft
			if (maybePutData) {
				const maybeRemovedData = await videosService.remove(draftId);

				databaseSuccess = !!maybeRemovedData;
			}
		}

		return databaseSuccess ? mergedDocument : undefined;
	};

	const createDraft = async (id: string): Promise<Nullable<Video>> => {
		if (!id) {
			console.error(`Failed to create draft because id was missing.`);
			return;
		}

		const parent = getById(id);

		if (!parent) {
			// TODO: error handle
			console.error(`Failed to create draft because no video was found with an id of "${id}".`);
			return;
		}

		const draftId = uuidv4();
		const draft: Video = { ...parent, id: draftId, is_draft_of: id, is_published: false };

		update((currentState) => [draft, ...currentState]);

		return await videosService.post(draft);
	};

	const create = async (donorDocument?: Video): Promise<Nullable<Video>> => {
		// set up as variable to assure it's identical in all fields
		const currentTimestamp = getTimestampNow();

		const title = donorDocument?.title ? `New: ${donorDocument.title}` : 'New Document';

		// Unique values that should always be reset.
		const baseProperties = {
			_created_at: currentTimestamp,
			_updated_at: currentTimestamp,
			id: uuidv4(),
			is_published: false,
			title
		};

		const boilerplateVideo: Video = {
			asset_data: {},
			attribution: undefined,
			caption: undefined,
			description: undefined,
			is_draft_of: undefined,
			provider: 'mux',
			status: undefined,
			...baseProperties
		};

		const document: Video = { ...(donorDocument || boilerplateVideo), ...baseProperties };

		update((currentState) => [document, ...currentState]);

		return await videosService.post(document);
	};

	const removeById = async (videoId: string): Promise<Nullable<Video>> => {
		let didRemove = false;

		update((currentState) =>
			currentState.filter((video) => {
				// NOTE: only remove the first occurance in the case of duplicates.
				if (video.id === videoId && !didRemove) {
					didRemove = true;
					return false;
				}

				return true;
			})
		);

		return didRemove ? await videosService.remove(videoId) : undefined;
	};

	return {
		create,
		createDraft,
		getById,
		getDrafts,
		load,
		mergeDraft,
		removeById,
		set,
		subscribe,
		update,
		updateVideo
	};
};

export const videosStore = createVideosStore();

/* 


*/

// TODO: for these next two --> the upper is if not using getContext in video editor root.

export const selectedVideoStore = (() => {
	const _selectedId = writable<Nullable<string>>();
	const _selectedVideo = derived([videosStore, _selectedId], ([$videosStore, $_selectedId]) => {
		if ($videosStore && $_selectedId) {
			return $videosStore.find((video) => video.id === $_selectedId);
		}
	});

	return {
		select: _selectedId.set,
		..._selectedVideo
	};
})();

/* eslint-disable-next-line no-secrets/no-secrets */
// REF: https://svelte.dev/repl/44455916128c40d386927cb72f9a3004?version=3.29.7
export const createSelectedVideoStore = () => {
	const _selectedId = writable<Nullable<string>>();
	const _selectedVideo = derived([videosStore, _selectedId], ([$videosStore, $_selectedId]) => {
		if ($videosStore && $_selectedId) {
			return $videosStore.find((video) => video.id === $_selectedId);
		}
	});

	return {
		select: _selectedId.set,
		..._selectedVideo
	};
};

export const createVideoNavigationListStore = () => {
	// TODO: rename "is_draft_of" to "draft_of" to avoid type confusion
	const { subscribe } = derived(videosStore, ($videosStore) => {
		if ($videosStore) {
			const documentsWithDraftsTable: Record<string, string> = $videosStore
				.filter((video) => !!video.is_draft_of)
				.reduce((previous, video) => ({ ...previous, [video.is_draft_of!]: video.id }), {});
			console.log(documentsWithDraftsTable);
			return $videosStore.filter((video) => !documentsWithDraftsTable[video.id]);
		}
	});

	return { subscribe };
};
