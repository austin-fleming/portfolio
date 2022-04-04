import type { Video } from '@repo/db';
import type { Nullable } from '@repo/shared';
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

const getTimestampNow = (): string => new Date().toISOString();

// TODO: either figure out optional fields for typescript in yup, or switch to zod.
/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
const buildBaseSchema = (): Video => ({
	id: uuidv4(),
	is_published: false,
	_created_at: getTimestampNow(),
	_updated_at: getTimestampNow(),
	title: undefined,
	description: undefined,
	caption: undefined,
	attribution: undefined,
	status: undefined,
	provider: 'mux',
	asset_data: {}
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export const manageVideos = (initialValue: Video[] = []) => {
	const { subscribe, set, update } = writable(initialValue);

	const create = () => {
		update((previous) => [buildBaseSchema(), ...previous]);
	};

	const modify = (updatedVideo: Video) => {
		let didUpdate = false;

		update((videos) =>
			videos.map((video) => {
				if (video.id === updatedVideo.id) {
					didUpdate = true;
					return updatedVideo;
				}

				return video;
			})
		);

		if (!didUpdate) {
			create();
		}

		return didUpdate;
	};

	return {
		create,
		modify,
		subscribe
	};
};

/* 


*/
const createPublishedVideos = () => {
	const { subscribe } = derived(testStore, ($testStore) =>
		$testStore.filter((video) => video.is_published)
	);

	return { subscribe };
};

export const createCurrentVideoStore = (videoId: string) => {
	const { subscribe } = derived(videosStore, ($videosStore) =>
		$videosStore.find((video) => video.id === videoId)
	);

	return { subscribe };
};

/* 


*/

export const createDerivedVideoStore = (videoId: string) => {
	const { subscribe } = derived(videosStore, ($videosStore) =>
		$videosStore.find((video) => video.id === videoId)
	);

	return { subscribe };
};

const isLoadingVideos = writable(false);

const loadingError = writable<Error>();

const receiveVideosError = (error: Error) => {
	isLoadingVideos.set(false);
	loadingError.set(error);
};

const receiveVideosSuccess = (data: Video[]) => {
	isLoadingVideos.set(false);
	videosStore.set(data);
};

const videos = () => ({
	all: videosStore,
	current: currentVideoStore,
	isLoading: isLoadingVideos,
	load: async () => {
		const { data, error } = await getVideos();

		if (error) {
			receiveVideosError(error);
			return;
		}

		receiveVideosSuccess(data);
	},
	loadingError: loadingError
});
