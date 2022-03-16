<script lang="ts">
	export let id: string;

	type HeroContent = {
		image: {
			alt: string;
			source: string;
		};
		subtitle: string;
		summary: string;
		title: string;
	};
	const heroContent: HeroContent = {
		image: {
			alt: 'foo',
			source:
				/* eslint-disable-next-line no-secrets/no-secrets */
				'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
		},
		subtitle: 'Say hi',
		summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque urna auctor.',
		title: 'Dev/Design'
	};
</script>

<section id="{id}" class="w-full h-screen flex flex-row">
	<div class="w-1/2 h-full flex flex-col justify-end">
		<span class="text-sm uppercase">{heroContent.subtitle}</span>
		<h1 class="text-8xl font-bold">{heroContent.title}</h1>
	</div>

	<div class="relative w-1/2 h-full flex flex-col justify-end items-end p-4">
		<img
			src="{heroContent.image.source}"
			alt="{heroContent.image.alt}"
			class="absolute w-full h-full object-cover top-0 right-0 bottom-0 left-0"
		/>
		<div
			class="relative bg-background w-full max-w-[30ch] p-4 rounded-lg border-4 border-solid border-primary"
		>
			{heroContent.summary}
		</div>
	</div>
</section>
