import { supabase } from '@db/client';
import { ApiError } from '@lib/error-handling/api-error';
import type { DataOrError } from '@lib/error-handling/data-or-error';
import { getPostgrestError } from '@lib/error-handling/get-postgrest-error';
import type { CaseStudy, CaseStudySubmission } from '@repo/db/src/case-studies';

export const postCaseStudy = async (
	caseStudyData: CaseStudySubmission
): Promise<DataOrError<CaseStudy[]>> => {
	const { data, error } = await supabase.from<CaseStudy>('case_study').insert([caseStudyData]);

	if (!data && !error)
		return { data, error: new ApiError('BAD_GATEWAY', 'Database host failed to respond.') };

	if (error) return { data, error: getPostgrestError(error) };

	return { data, error };
};
