<script lang="ts">
	import Button from '$components/button.svelte';
	import {
		createSelectedVideoStore,
		createVideoNavigationListStore,
		videosStore
	} from '$stores/videos';
	import type { Video } from '@repo/db';
	import type { Nullable } from '@repo/shared';
	import { onMount, setContext } from 'svelte';
	import { create } from 'yup/lib/Reference';
	import Pane from './pane.svelte';
	import PanesContainer from './panes-container.svelte';
	import VideoEditor from './video-editor.svelte';
	import VideoPreview from './video-preview.svelte';

	let isLoading = true;
	let video: Nullable<Video>;

	const selectedVideoStore = createSelectedVideoStore();
	const videoNavigationListStore = createVideoNavigationListStore();

	setContext('selectedVideoStore', selectedVideoStore);

	$: if ($selectedVideoStore?.id) {
		video = videosStore.getById($selectedVideoStore.id);
	}

	onMount(() => {
		videosStore.load({}, () => (isLoading = false));
	});

	const handleEditorSelfDestruct = async () => {
		const didDelete = video?.id && (await videosStore.removeById(video.id));

		if (didDelete) {
			/* eslint-disable-next-line unicorn/no-useless-undefined */
			selectedVideoStore.select(undefined);
			video = undefined;
		} else {
			// TODO: handle error here
			console.error('Could not remove item');
		}
	};

	const handleMergeDraft = async () => {
		// merge with parent
		const maybeMergedDocument = await videosStore.mergeDraft(video);

		if (maybeMergedDocument) {
			console.log('Merged!');
			/* eslint-disable-next-line unicorn/no-useless-undefined */
			selectedVideoStore.select(maybeMergedDocument.id);
			video = videosStore.getById($selectedVideoStore.id);
		} else {
			// TODO: error handle
			console.error(':( draft commit failed');
		}
	};

	const handleDropChanges = async () => {
		const parentId = video?.is_draft_of;
		const didDelete = video?.id && (await videosStore.removeById(video.id));

		if (didDelete) {
			/* eslint-disable-next-line unicorn/no-useless-undefined */
			selectedVideoStore.select(parentId);
			// video = undefined;
		} else {
			// TODO: handle error here
			console.error('Could not drop changes');
		}
	};
</script>

<PanesContainer>
	<Pane slot="sidebar">
		<div slot="title" class="h-full flex flex-row w-full justify-between items-center">
			<h1 class="leading-none">Videos</h1>

			<div class="flex flex-row gap-4 items-center">
				<p class="text-xs font-normal leading-none">
					{$videoNavigationListStore?.length || '_'} items
				</p>
				<Button
					type="button"
					aria-label="create new"
					size="sm"
					on:click="{async () => {
						const maybeCreatedDocument = await videosStore.create();
						selectedVideoStore.select(maybeCreatedDocument.id);
					}}">New</Button
				>
			</div>
		</div>
		<div slot="content">
			{#if isLoading}
				<span>Loading...</span>
			{:else}
				<div class="w-full flex flex-col gap-4">
					<!-- TODO: Need to preprocess somehow to overlay drafts onto parent document. -->
					{#each $videoNavigationListStore as video, index (video.id)}
						<VideoPreview video="{video}" />
					{/each}
				</div>
			{/if}
		</div>
	</Pane>

	<Pane slot="editor">
		<h1 slot="title">{$selectedVideoStore?.title || 'Editor'}</h1>
		<div slot="content">
			{#if video}
				<VideoEditor
					video="{video}"
					on:selfdestruct="{handleEditorSelfDestruct}"
					on:mergedraft="{handleMergeDraft}"
					on:dropchanges="{handleDropChanges}"
				/>
			{:else}
				<div class="w-full h-full flex flex-col justify-center items-center">
					<span>Select a video.</span>
				</div>
			{/if}
		</div>
	</Pane>
</PanesContainer>
