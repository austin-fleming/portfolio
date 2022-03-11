<script context="module" lang="ts">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';
	import { getCaseStudies } from '$db/get-case-studies';
	import type { CaseStudy } from '@repo/db';

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const { slug } = params;
		const maybeCaseStudies = await getCaseStudies({ slug });

		if (!maybeCaseStudies || maybeCaseStudies.length === 0) {
			return { fallthrough: true };
		}

		const caseStudyData: CaseStudy = maybeCaseStudies[0];

		return {
			status: 200,
			props: { caseStudyData }
		};
	};
</script>

<script lang="ts">
	export let caseStudyData: CaseStudy;
</script>

<article><pre>{JSON.stringify(caseStudyData, null, '\t')}</pre></article>
