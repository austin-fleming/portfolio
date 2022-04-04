<script lang="ts">
	import { getContext } from 'svelte';
	import VideoPreviewCard from './video-preview-card.svelte';

	let errorMessage: string;

	const videosStore = getContext('videosStore');
</script>

{#if !$videosStore}
	<div>Loading...</div>
{:else if errorMessage}
	<div>
		<p>Error Loading</p>
		<p>{errorMessage}</p>
	</div>
{:else}
	{#each $videosStore as video}
		<VideoPreviewCard video="{video}" />
	{/each}
{/if}
