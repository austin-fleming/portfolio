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
	import PortfolioPreview from '$components/sections/portfolio-preview.svelte';
	import Bio from '$components/sections/bio.svelte';
	import Hero from '$components/sections/hero.svelte';
	export let caseStudiesData: CaseStudy[];
</script>

<div>
	<Hero id="hero" />

	<Bio id="bio" />

	<PortfolioPreview id="case-studies" />
</div>
