<script lang="ts">
	import type { Video } from '@repo/db';
	import { getContext, onDestroy, onMount } from 'svelte';

	const SYNC_INTERVAL_MS = 1000 * 15;

	let isPublishable = false; // TODO: set true and activate publish button if validation passes.

	let hasUnsavedChanges: boolean;

	$: hasUnsavedChanges = false;

	let files: FileList;
	let fileUploadInput: HTMLInputElement;

	const currentVideoStore = getContext('currentVideoStore');

	let workingDocument = $currentVideoStore;

	const videosStore = getContext<Video[]>('videosStore');

	/* $: {
		hasUnsavedChanges = hasUnsavedChanges;
	} */

	const saveCurrentToMainStore = () => {
		$videosStore = $videosStore.map((video) =>
			video.id === $currentVideoStore.id ? $currentVideoStore : video
		);
	};

	const registerUnsavedChanges = () => {
		hasUnsavedChanges = true;
	};

	const registerChangesSaved = () => {
		hasUnsavedChanges = false;
	};

	onMount(() => {
		setInterval(() => {
			console.log('Syncing');

			saveCurrentToMainStore();

			registerChangesSaved();
		}, SYNC_INTERVAL_MS);
	});
</script>

<div class="w-full max-w-[600px] m-auto flex flex-col gap-4">
	<div>
		<h3>ID</h3>
		<div class="text-xs whitespace-pre-wrap w-full break-words">
			{$currentVideoStore.id ? $currentVideoStore.id : 'ID will be created when published.'}
		</div>
	</div>

	{#if $currentVideoStore.status === 'ready'}
		<div
			class="bg-ui-success-bg text-ui-success px-[2em] py-[0.5em] font-bold text-sm border-2 border-solid border-ui-success"
		>
			VIDEO READY
		</div>
	{:else if $currentVideoStore.status === 'pending'}
		<div
			class="bg-ui-warn-bg text-ui-warn px-[2em] py-[0.5em] font-bold text-sm border-2 border-solid border-ui-warn"
		>
			VIDEO PENDING
		</div>
	{:else if $currentVideoStore.status === 'cancelled'}
		<div
			class="bg-ui-error-bg text-ui-error px-[2em] py-[0.5em] font-bold text-sm border-2 border-solid border-ui-error"
		>
			VIDEO CANCELLED
		</div>
	{:else}
		<div
			class="bg-ui-info-bg text-ui-info px-[2em] py-[0.5em] font-bold text-sm border-2 border-solid border-ui-info"
		>
			NO VIDEO UPLOADED
		</div>
	{/if}

	{#if hasUnsavedChanges}
		<div class="px-[2em] py-[0.75em] text-sm font-bold bg-ui-warn-bg text-ui-warn">
			Syncing Unsaved Changes
		</div>
	{:else}
		<div class="px-[2em] py-[0.75em] text-sm font-bold bg-ui-success-bg text-ui-success">
			Up To Date
		</div>
	{/if}

	<button
		on:click="{() => {
			saveCurrentToMainStore();
		}}">save</button
	>
	<!-- TODO: decide between this and upload-video-form.svelte -->
	<form
		class="w-full flex flex-col gap-4"
		on:keydown="{() => {
			console.log('form update');
			registerUnsavedChanges();
			console.log(hasUnsavedChanges);
		}}"
	>
		<label for="ve-field--upload"
			>Select Video*
			<input
				id="ve-field--upload"
				type="file"
				name="video-upload"
				bind:files
				bind:this="{fileUploadInput}"
				accept="video/*"
				required
			/>
		</label>

		<label htmlfor="ve-field--title">
			Title*
			<input
				id="ve-field--title"
				type="text"
				name="title"
				placeholder="video title"
				min="3"
				max="150"
				bind:value="{$currentVideoStore.title}"
				required
			/>
		</label>

		<label htmlfor="ve-field--description">
			Description*
			<textarea
				id="ve-field--description"
				type="text"
				name="description"
				placeholder="video description"
				bind:value="{$currentVideoStore.description}"
				rows="3"
				required></textarea>
		</label>

		<label htmlfor="ve-field--caption">
			Caption
			<textarea
				id="ve-field--caption"
				type="text"
				name="caption"
				placeholder="caption"
				rows="2"
				bind:value="{$currentVideoStore.caption}"></textarea>
		</label>

		<label htmlfor="ve-field--attribution">
			Attribution
			<input
				id="ve-field--attribution"
				type="text"
				name="attribution"
				placeholder="attribution"
				bind:value="{$currentVideoStore.attribution}"
			/>
		</label>
	</form>

	<div class="flex flex-col gap-4 w-full p-4 border-l-2 border-solid border-background-less">
		<h2 class="font-bold">General Information</h2>

		<div>
			<h3>Asset Data</h3>
			<code class="text-xs whitespace-pre-wrap w-full break-words"
				>{$currentVideoStore.asset_data
					? JSON.stringify($currentVideoStore.asset_data, null, '\t')
					: 'Will be generated when published.'}</code
			>
		</div>

		<div>
			<h3>Provider</h3>
			<p>{$currentVideoStore.provider}</p>
		</div>
	</div>
</div>
