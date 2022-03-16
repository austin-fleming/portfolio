<script lang="ts">
	import Button from '$components/button.svelte';

	export let id: string;

	type HeadingContent = {
		cta?: {
			destination: string;
			label: string;
		};
		description: string;
		subtitle: string;
		title: string;
	};
	const headingContent: HeadingContent = {
		cta: {
			destination: '#',
			label: 'See All'
		},
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque urna auctor facilisis et, arcu varius tincidunt ultricies. In nibh sit aliquam, id aenean malesuada velit.',
		subtitle: "What I've been working on",
		title: 'Work Samples'
	};

	type CaseStudies = Array<{
		image?: {
			alt: string;
			source: string;
		};
		subtitle: string;
		summary: string;
		title: string;
		tools?: string[];
	}>;
	/* eslint-disable sonarjs/no-duplicate-string */
	const caseStudies: CaseStudies = [
		{
			subtitle: 'multidisciplinary',
			summary: 'fdsf fds fds fdsa fdsa fdsaf fdsaf fdsa fds fdsa',
			title: 'Gifting Platform',
			tools: ['next.js', 'Tailwind', 'Sanity']
		},
		{
			image: {
				alt: 'foo',
				source: 'https://img.youtube.com/vi/hCo4qhgp2d8/maxresdefault.jpg'
			},
			subtitle: 'branding',
			summary: 'fdsf fds fds fdsa fdsa fdsaf fdsaf fdsa fds fdsa',
			title: 'YBY',
			tools: ['next.js', 'Tailwind', 'Sanity']
		},
		{
			image: {
				alt: 'foo',
				source:
					/* eslint-disable-next-line no-secrets/no-secrets */
					'https://images.unsplash.com/photo-1647125529760-a17654ff8b67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
			},
			subtitle: 'multidisciplinary',
			summary: 'fdsf fds fds fdsa fdsa fdsaf fdsaf fdsa fds fdsa',
			title: 'SmartHER News',
			tools: ['next.js', 'Tailwind', 'Sanity']
		},
		{
			image: {
				alt: 'foo',
				/* eslint-disable-next-line no-secrets/no-secrets */
				source: 'https://img.youtube.com/vi/bZ39Z76i7AU/maxresdefault.jpg'
			},
			subtitle: 'multidisciplinary',
			summary: 'fdsf fds fds fdsa fdsa fdsaf fdsaf fdsa fds fdsa',
			title: 'Majlis for Future Generations',
			tools: ['next.js', 'Tailwind', 'Sanity']
		},
		{
			subtitle: 'multidisciplinary',
			summary: 'fdsf fds fds fdsa fdsa fdsaf fdsaf fdsa fds fdsa',
			title: 'Fridays Films',
			tools: ['next.js', 'Tailwind', 'Sanity']
		}
	];
	/* eslint-enable sonarjs/no-duplicate-string */
</script>

<section id="{id}">
	<div class="flex flex-col items-start">
		<span class="text-sm uppercase">{headingContent.subtitle}</span>
		<h1 class="text-6xl font-bold">{headingContent.title}</h1>
		<p class="pt-[3em]">{headingContent.description}</p>
		{#if headingContent.cta}
			<Button href="#" round="full" interaction="arrow">{headingContent.cta.label}</Button>
		{/if}
	</div>

	<div class="w-full">
		<div
			class="w-full flex flex-row flex-nowrap items-stretch justify-start overflow-x-scroll snap-x snap-proximity scroll-px-4"
		>
			{#each caseStudies as { title, summary, tools, subtitle, image }}
				<article
					class="group relative w-[20vw] min-w-[250px] min-h-full flex flex-col bg-background text-primary border-2 border-solid border-transparent hover:border-primary hover:bg-accent1 hover:text-background transition-colors duration-300 p-4 pt-[7.5vw] snap-start"
				>
					{#if image}
						<img
							src="{image.source}"
							alt="{image.alt}"
							class="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-25 transition-opacity duration-700"
						/>
					{/if}
					<div class="absolute top-0 right-0 opacity-0 group-hover:opacity-100">-></div>
					<div class="w-full relative">
						<span class="text-xs uppercase">{subtitle}</span>
						<h1 class="text-2xl font-bold mb-[1em]">{title}</h1>

						<p>{summary}</p>
						{#if tools && tools.length > 0}
							<ul
								class="w-full flex flex-row flex-wrap list-disc list-inside marker:text-primary-lesser"
							>
								{#each tools as tool}
									<li class="w-1/2">{tool}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</article>
			{/each}
		</div>
		<span>Scroll -></span>
	</div>
</section>
