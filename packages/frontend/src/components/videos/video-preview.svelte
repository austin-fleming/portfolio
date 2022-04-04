<script lang="ts">
	import type { Video } from '@repo/db';
	import Badge from '$components/badge.svelte';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const selectedVideoStore = getContext<Readable<Video>>('selectedVideoStore');

	export let video: Video;

	let isSelected: boolean;

	const handleVideoSelection = () => {
		selectedVideoStore.select(video.id);
	};

	$: isSelected = $selectedVideoStore?.id === video.id;
</script>

<article id="{video.id}" class="root" class:root--selected="{isSelected}">
	<button class="preview-button" on:click="{handleVideoSelection}">
		{#if video.is_draft_of}
			<Badge color="warn" size="sm">Modified</Badge>
		{:else}
			<Badge color="{video.is_published ? 'success' : 'primary'}" size="sm"
				>{video.is_published ? 'published' : 'unpublished'}</Badge
			>
		{/if}
		<div>
			<h1 class="text-base">{video.title || 'Untitled'}</h1>
			{#if video.description}
				<p class="text-sm">{video.description}</p>
			{/if}
		</div>
	</button>
	{#if isSelected}
		<a class="go-to-editor" href="#editor-pane" type="button" aria-label="go to editor"
			>Go to editor</a
		>
	{/if}
	<!-- <code class="text-xs whitespace-pre-wrap">{JSON.stringify(video, null, '\t')}</code> -->
</article>

<style>
	.root {
		@apply relative border-2 border-solid border-transparent;
	}
	.root:hover {
		@apply border-primary-lesser;
	}

	.preview-button {
		@apply w-full p-4 overflow-hidden flex flex-col justify-start text-left;
	}

	.go-to-editor {
		@apply absolute bottom-0 left-0 opacity-0 pointer-events-none;
	}
	.go-to-editor:focus {
		@apply opacity-100 pointer-events-auto;
	}

	.root--selected,
	.root--selected:hover {
		@apply border-primary;
	}
</style>
