<script lang="ts">
	import Badge from '$components/badge.svelte';
	import Button from '$components/button.svelte';
	import { mergeDraftDispatcher } from '$lib/dispatchers/merge-draft-dispatcher';
	import { dropChangesDispatcher } from '$lib/dispatchers/drop-changes-dispatcher';
	import { videosStore } from '$stores/videos';
	import type { Video } from '@repo/db';
	import { objectsDeeplyEqual, type Nullable } from '@repo/shared';
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import TextInput from './form-components/text-input.svelte';
	import { selfDestructDispatcher } from '$lib/dispatchers/self-destruct-dispatcher';

	/* 
  TODO: Publish/edit flow:
        - Publish button that runs validation.
        - Document should lock on publish. An "edit" button creates draft document.
        - Draft document must be publishable to merge edits.
        - Delete should be renamed to "revert changes" if draft.
        - There should be a "view original" button on drafts.
  TODO: Create central dispatch controller:
        - Instead of handling changes in the editor, maybe move into the parent.
          Have all actions be handled as  dispatches.
  */

	const selectedVideoStore = getContext<Readable<Video>>('selectedVideoStore');

	// TODO: make into reducer?
	const selfDestruct = selfDestructDispatcher();
	const mergeDraft = mergeDraftDispatcher();
	const dropChanges = dropChangesDispatcher();

	export let video: Nullable<Video>;
	let lastSavedVideo: Video;
	// TODO: maybe accept as param instead to allow parent more control.
	// video = videosStore.getById($selectedVideoStore.id) as Video;
	lastSavedVideo = { ...video };

	let hasUnsavedChanges = false;
	let validationStatus: 'UNVALIDATED' | 'ERROR' | 'VALID' = 'VALID';

	const syncChanges = async () => {
		hasUnsavedChanges = !objectsDeeplyEqual(video, lastSavedVideo);

		if (hasUnsavedChanges) {
			// TODO: get confirmation back that put was successful.
			await videosStore.updateVideo(video);

			lastSavedVideo = { ...video };
			hasUnsavedChanges = false;
		}
	};

	onMount(() => {
		const SYNC_INTERVAL_MS = 1000 * 10;

		let count = 0;

		setInterval(() => {
			console.log('syncing:', count);
			count++;
			syncChanges();
		}, SYNC_INTERVAL_MS);
	});

	onDestroy(async () => {
		// Save if closed.
		syncChanges();
	});

	const handleSaveChanges = () => {
		syncChanges();
	};

	// TODO: Always immediately backup on change?
	const genericInputProperties = {
		'on:input': () => {
			console.log('input!');
			hasUnsavedChanges = true;
		}
	};
</script>

<div class="flex flex-col gap-8 max-w-[600px] mx-auto">
	<div id="document-sync-status" class="fixed right-4 bottom-4">
		<Badge color="{hasUnsavedChanges ? 'warn' : 'success'}"
			>{hasUnsavedChanges ? '⌛️ Syncing' : '✅ Saved'}</Badge
		>
	</div>

	{#if video.is_published}
		<Badge color="success">Published</Badge>
	{/if}
	{#if video.is_draft_of}
		<Badge color="warn">Modified</Badge>
	{/if}
	{#if !video.is_published && !video.is_draft_of}
		<Badge color="primary">Unpublished</Badge>
	{/if}
	<!-- <div>
		<p>Remote: {$videosStore.find((item) => item.id === video?.id)?.title}</p>
		<p>
			Last Saved: {lastSavedVideo.title} | {lastSavedVideo.is_published ? 'published' : 'draft'}
		</p>
		<p>Local: {video?.title} | {video?.is_published ? 'published' : 'draft'}</p>
	</div> -->

	<form
		id="document-form"
		on:submit|preventDefault="{() => {}}"
		class="flex flex-col gap-6 py-4"
		class:pointer-events-none="{video?.is_published}"
		class:opacity-50="{video?.is_published}"
	>
		<TextInput
			id="field__title"
			label="Title"
			isRequired
			bind:inputValue="{video.title}"
			onInput="{genericInputProperties['on:input']}"
		/>

		<!-- <label htmlfor="field__is-published">
			Is Published
			<input
				id="field__is-published"
				type="checkbox"
				bind:checked="{video.is_published}"
				on:input="{genericInputProperties['on:input']}"
			/>
		</label> -->

		<TextInput
			id="field__description"
			label="Description"
			isRequired
			bind:inputValue="{video.description}"
			onInput="{genericInputProperties['on:input']}"
		/>

		<TextInput
			id="field__caption"
			label="Caption"
			isRequired="{false}"
			bind:inputValue="{video.caption}"
			onInput="{genericInputProperties['on:input']}"
		/>

		<TextInput
			id="field__attribution"
			label="Attribution"
			isRequired="{false}"
			bind:inputValue="{video.attribution}"
			onInput="{genericInputProperties['on:input']}"
		/>
	</form>

	<div id="document-metadata" class="w-full bg-background-less flex flex-col gap-4 p-4 text-xs">
		<span class="text-sm font-bold">Metadata</span>

		<div class="flex flex-col gap-2">
			<span class="font-bold">ID:</span>
			<code>{video?.id}</code>
		</div>

		<div class="flex flex-col gap-2">
			<span class="font-bold">Is Draft of:</span>
			<code>{video?.is_draft_of}</code>
		</div>

		<div class="flex flex-col gap-2">
			<span class="font-bold">Created at:</span>
			<code>{video?._created_at}</code>
		</div>

		<div class="flex flex-col gap-2">
			<span class="font-bold">Updated at:</span>
			<code>{video?._updated_at}</code>
		</div>

		<div class="flex flex-col gap-2">
			<span class="font-bold">Video provider:</span>
			<code>{video?.provider}</code>
		</div>

		<div class="flex flex-col gap-2">
			<span class="font-bold">Raw:</span>
			<code class="whitespace-pre-wrap">{JSON.stringify(video, null, '\t')}</code>
		</div>
	</div>

	<div id="document-actions-list" class="w-full flex flex-row justify-between gap-4">
		<div id="primary-actions" class="flex flex-row gap-4">
			{#if !video.is_published && !video.is_draft_of}
				<Button
					id="action-publish"
					color="success"
					isDisabled="{validationStatus !== 'VALID' || video.is_published}"
					on:click="{async () => {
						video.is_published = true;
						// assure work isn't lost
						await syncChanges();
						// TODO: validate
						// create new video
					}}">Publish</Button
				>
			{/if}

			{#if video.is_published && !video.is_draft_of}
				<Button
					id="action-unpublish"
					color="secondary"
					isDisabled="{!video.is_published}"
					on:click="{async () => {
						video.is_published = false;
						// assure work isn't lost
						await syncChanges();
						// TODO: validate
						// create new video
					}}">Unpublish</Button
				>

				<Button
					id="action-edit"
					color="primary"
					style="outline"
					on:click="{async () => {
						// TODO: add confirmation message
						const maybeDraftId = await videosStore.createDraft(video?.id);

						if (maybeDraftId) {
							selectedVideoStore.select(maybeDraftId);
						} else {
							// TODO: error handle
							console.log('Failed to create draft.');
						}
					}}">Edit</Button
				>
			{/if}

			{#if video.is_draft_of}
				<Button
					id="action-merge-changes"
					color="primary"
					disabled="{video.is_published}"
					on:click="{async () => {
						video.is_published = true;
						// assure work isn't lost
						await syncChanges();

						mergeDraft();
					}}">Merge Changes</Button
				>
			{/if}
		</div>

		<div id="secondary-actions" class="flex flex-row">
			<Button
				id="action-duplicate"
				style="text"
				on:click="{async () => {
					// assure work isn't lost
					await syncChanges();
					// create new video
					const maybeDuplicatedVideo = videosStore.create(video);
					// select new video
					selectedVideoStore.select(maybeDuplicatedVideo.id);
				}}">Duplicate</Button
			>

			{#if video.is_draft_of}
				<Button
					color="error"
					style="text"
					on:click="{async () => {
						// TODO: add confirmation message
						dropChanges();
					}}">Drop Changes</Button
				>
			{:else}
				<Button
					color="error"
					style="text"
					on:click="{async () => {
						// TODO: add confirmation message
						selfDestruct();
					}}">Delete</Button
				>
			{/if}
		</div>
	</div>
</div>
