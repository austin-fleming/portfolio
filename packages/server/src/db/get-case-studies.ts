import { supabase } from '@db/client';
import type { ExpandedCaseStudy, CaseStudy } from '@repo/db';
import { statusCodes } from '@lib/response-codes';
/* 
TODO: place all fetchers in db/api to more easily allow
hot-swapping databases and normalizing their returns to a
strongly typed structure.
*/
// const expandedCaseStudyQuery = '*, author (*)';

/* 
TODO: use error method from post-case-studies to catch postgres errors.
*/

type GetCaseStudiesOptions = {
	limit?: number;
	offset?: number;
	slug?: string;
};

export const getCaseStudies = async ({ limit = 10, offset = 0, slug }: GetCaseStudiesOptions) => {
	let query = supabase
		.from<CaseStudy>('case_study')
		.select('*')
		.range(offset, limit - 1);

	if (slug) {
		query = query.eq('slug', slug);
	}

	const { data, error } = await query;

	if (error) {
		console.error(error);

		return {
			data,
			error: {
				status: 500,
				error: 'Server Error',
				message: error.message
			}
		};
	}

	if (!data || data.length === 0) {
		return {
			data,
			error: {
				status: statusCodes.NOT_FOUND,
				error: 'Not Found',
				message: 'No case studies have been added... yet.'
			}
		};
	}

	return { data, error };
};

export const getCaseStudyById = async (id: string) =>
	supabase.from<CaseStudy>('case_study').select('*').eq('id', id).single();
