<script lang="ts">
	import Badge from '$components/badge.svelte';
	import Button from '$components/button.svelte';
	import { getVideoById } from '$db/get-video-by-id';

	import { videosStore } from '$stores/videos';
	import { onMount } from 'svelte';

	onMount(() => {
		videosStore.load();
	});
</script>

<div class="pt-header">
	{#if $videosStore}
		<section class="flex flex-col gap-4">
			{#each $videosStore as video}
				{(video.is_published = !video.is_draft_of)}
				<article class="border-2 border-solid border-primary p-4">
					<div class="flex flex-row gap-4">
						{#if video.is_draft_of}
							<Badge color="warn">Draft</Badge>
						{/if}

						{#if video.is_published}
							<Badge color="success">Published</Badge>
						{:else}
							<Badge color="primary">Unpublished</Badge>
						{/if}
					</div>
					<pre class="text-xs">{JSON.stringify(video, null, '\t')}</pre>

					{#if !!video.is_draft_of}
						<div class="flex flex-row gap-4">
							<Button
								size="sm"
								style="outline"
								on:click="{() => {
									video.title = 'new title';

									console.log(videosStore.getById(video.id));
								}}">Change Title</Button
							>

							<Button
								size="sm"
								style="outline"
								on:click="{() => {
									videosStore.commitDraft(video);
								}}">Commit</Button
							>
						</div>
					{/if}
				</article>
			{/each}
		</section>

		<button on:click="{() => videosStore.createDraft($videosStore[0].id)}">Create Draft</button>
	{:else}
		<span class="text-lg font-bold"> Loading... </span>
	{/if}
</div>
