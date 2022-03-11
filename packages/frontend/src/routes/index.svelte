<script context="module" lang="ts">
	export const prerender = true;

	import type { Load } from '@sveltejs/kit';
	import { getCaseStudies } from '$db/get-case-studies';
	import type { CaseStudy } from '@repo/db';

	export const load: Load = async () => {
		const maybeCaseStudies = await getCaseStudies();

		const caseStudiesData: CaseStudy[] = maybeCaseStudies || [];

		// TODO: better error handle getter failing
		return {
			props: {
				caseStudiesData
			}
		};
	};
</script>

<script lang="ts">
	import CaseStudyCard from '$components/case-study-card.svelte';
	export let caseStudiesData: CaseStudy[];
</script>

<div>
	{#each caseStudiesData as { title, summary, slug }}
		<CaseStudyCard title="{title}" summary="{summary}" href="{`/case-studies/${slug}`}" />
	{/each}
</div>
