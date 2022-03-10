import { supabase } from '@db/client';
import type { ExpandedCaseStudy } from '@repo/db';
/* 
TODO: place all fetchers in db/api to more easily allow
hot-swapping databases and normalizing their returns to a
strongly typed structure.
*/
const expandedCaseStudyQuery = '*, author (*)';

/* 
TODO: use error method from post-case-studies to catch postgres errors.
*/
export const fetchCaseStudies = async () =>
    supabase
        .from<ExpandedCaseStudy>('case_study')
        .select(expandedCaseStudyQuery);

export const fetchCaseStudyById = async (id: string) =>
    supabase
        .from<ExpandedCaseStudy>('case_study')
        .select(expandedCaseStudyQuery)
        .eq('id', id)
        .single();
