<script lang="ts">
	import type { Video } from '@repo/db';
	import { getContext } from 'svelte';

	export let video: Video;

	const currentVideoStore = getContext('currentVideoStore');
</script>

<article
	class="w-full p-4 rounded flex flex-col items-start gap-4 border-transparent border-2 border-solid rounded-md hover:border-primary-lesser"
	class:bg-background-less="{video.id === $currentVideoStore?.id}"
	on:click="{() => {
		$currentVideoStore = video;
	}}"
>
	<span
		class="px-[2em] py-[0.75em] rounded leading-none text-xs font-bold"
		class:bg-ui-warn-bg="{!video.is_published}"
		class:text-ui-warn="{!video.is_published}"
		class:bg-ui-success-bg="{video.is_published}"
		class:text-ui-success="{video.is_published}"
		>{video.is_published ? 'published' : 'unpublished'}</span
	>
	<h1 class="font-bold">{video.title || 'Untitled'}</h1>

	{#if video.description}
		<div class="text-sm font-bold">{video.description}</div>
	{/if}

	<code class="text-xs overflow-hidden whitespace-pre-wrap"
		>{JSON.stringify(video, null, '\t')}</code
	>

	{#if video.asset_data}
		<img
			class="w-full"
			src="{`https://image.mux.com/${video.asset_data.id}/thumbnail.jpg`}"
			alt="{video.title}"
		/>
	{/if}
</article>
