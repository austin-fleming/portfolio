import { caseStudyService } from '$lib/api/case-studies';
import type { CaseStudy, Video } from '@repo/db';
import { derived, writable } from 'svelte/store';

const createCaseStudiesStore = () => {
	const store = writable<CaseStudy[]>();
	const { subscribe, set, update } = store;

	const load = async (doAfter?: () => void) => {
		const data = await caseStudyService.getAll();

		set(data || []);

		if (doAfter) doAfter();
	};

	return {
		load,
		set,
		subscribe,
		update
	};
};

export const caseStudiesStore = createCaseStudiesStore();

type PrimaryDocument = CaseStudy | Video;

const isDraftDocument = <T>(document: T) => !!document?.is_draft_of;
const buildHashTable = (
	previous: Record<CaseStudy['is_draft_of'], CaseStudy['id']>,
	current: CaseStudy
): Record<string, string> => ({ ...previous, [current.is_draft_of!]: current.id });

const createCaseStudiesNavigationListStore = () => {
	const { subscribe } = derived(caseStudiesStore, ($caseStudiesStore) => {
		if ($caseStudiesStore) {
			const test = $caseStudiesStore.filter((caseStudy) => isDraftDocument(caseStudy));

			const documentsWithDraftsTable: Record<string, string> = $caseStudiesStore
				.filter((caseStudy) => !!caseStudy.is_draft_of)
				.reduce(
					(previous, caseStudy) => ({ ...previous, [caseStudy.is_draft_of!]: caseStudy.id }),
					{}
				);
		}
	});
};
