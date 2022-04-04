import { supabase } from '@db/client';
import type { ExpandedCaseStudy, CaseStudy } from '@repo/db/src/case-studies';

import { ApiError, DataOrError, Nothing } from '@repo/shared';

/* 
TODO: place all fetchers in db/api to more easily allow
hot-swapping databases and normalizing their returns to a
strongly typed structure.
*/
// const expandedCaseStudyQuery = '*, author (*)';

/* 
TODO: use error method from post-case-studies to catch postgres errors.
*/
const expandedCaseStudySelector = `*, author:author(*), feature_video:video(*)`;

type GetCaseStudiesOptions = {
	limit?: number;
	offset?: number;
	slug?: string;
};

export const getCaseStudies = async ({
	limit = 10,
	offset = 0
}: GetCaseStudiesOptions): Promise<DataOrError<ExpandedCaseStudy[]>> => {
	const { data, error } = await supabase
		.from<ExpandedCaseStudy>('case_study')
		.select(expandedCaseStudySelector)
		.range(offset, limit - 1);

	if (error)
		return {
			data: undefined,
			error: new ApiError('INTERNAL_SERVER_ERROR', 'Server Error', error.message)
		};

	if (!data || data.length === 0)
		return {
			data: undefined,
			error: new ApiError('NOT_FOUND', 'No case studies have been added... yet')
		};

	return { data, error };
};

export const getCaseStudyById = async (id: string): Promise<DataOrError<CaseStudy>> => {
	const { data, error } = await supabase
		.from<CaseStudy>('case_study')
		.select(expandedCaseStudySelector)
		.eq('id', id)
		.single();

	if (error)
		return { data, error: new ApiError('INTERNAL_SERVER_ERROR', 'Server Error', error.message) };

	if (!data) return { data, error: new ApiError('NOT_FOUND', 'No case study found for this ID.') };

	return { data, error };
};
