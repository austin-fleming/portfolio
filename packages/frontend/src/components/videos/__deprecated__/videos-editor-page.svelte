<script lang="ts">
	// import EditorPanel from '$components/editor/editor-panel.svelte';
	// import { getVideoById } from '$db/get-video-by-id';

	import { getVideos } from '$db/get-videos';
	import { videosService } from '$lib/api/videos';
	import type { Video } from '@repo/db';

	import type { Nullable } from '@repo/shared';

	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import VideoEditor from './video-editor.svelte';
	import VideosList from './videos-list.svelte';

	let currentVideoId: Nullable<string>;
	let currentVideo: Nullable<Video>;

	const videosStore = writable<Nullable<Video[]>>();
	setContext('videosStore', videosStore);
	const currentVideoStore = writable<Nullable<Video>>();
	setContext('currentVideoStore', currentVideoStore);
	const currentVideoIdStore = writable<Nullable<string>>();
	setContext('currentVideoIdStore', currentVideoIdStore);

	onMount(async () => {
		$videosStore = await videosService.getAll();
	});
</script>

<div class="w-full flex flex-row min-h-full h-screen pt-header">
	<section class="w-1/4 border-r-2 border-solid border-primary flex flex-col shadow-2xl">
		<div class="w-full p-4 border-b-[1px] border-solid border-primary">
			<span>Videos</span>
		</div>

		<div class="w-full overflow-y-auto p-4 flex flex-col gap-4">
			<VideosList />
		</div>
	</section>

	<section
		class="w-3/4 border-r-[1px] border-solid border-background-lesser flex flex-col justify-between"
	>
		{#if $currentVideoStore}
			<div class="w-full p-4 border-b-[1px] border-solid border-primary">
				<span>{$currentVideoStore.title || 'Untitled'}</span>
			</div>

			<div class="w-full h-full overflow-y-auto p-4">
				<VideoEditor />
			</div>

			<div
				class="w-full p-4 border-t-[1px] border-solid border-primary flex flex-row justify-between"
			>
				<div class="flex flex-col justify-between text-sm">
					<p>
						{$currentVideoStore._created_at ? `Created: ${$currentVideoStore._created_at}` : ''}
					</p>
					<p>
						{$currentVideoStore._updated_at
							? `Last updated: ${$currentVideoStore._updated_at}`
							: 'Never modified'}
					</p>
				</div>
				<button class="px-[2em] py-[0.75em] bg-background-less text-primary-less text-sm font-bold"
					>Publish</button
				>
			</div>
		{:else}
			<div class="w-full h-full flex flex-col justify-center items-center">
				<p>Select a video to edit.</p>
			</div>
		{/if}
	</section>

	<!-- <section class="w-3/4">
		{#if currentVideo}
			<VideoEditor videoData="{currentVideo}" />
		{:else}
			<p>Select a video to edit.</p>
		{/if}
	</section> -->
</div>
