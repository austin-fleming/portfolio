import { supabase } from '@db/client';
import type { ExpandedCaseStudy, CaseStudy } from '@repo/db';
/* 
TODO: place all fetchers in db/api to more easily allow
hot-swapping databases and normalizing their returns to a
strongly typed structure.
*/
// const expandedCaseStudyQuery = '*, author (*)';

/* 
TODO: use error method from post-case-studies to catch postgres errors.
*/
export const fetchCaseStudies = async () =>
    supabase.from<CaseStudy>('case_study').select('*');

export const fetchCaseStudyById = async (id: string) =>
    supabase.from<CaseStudy>('case_study').select('*').eq('id', id).single();
