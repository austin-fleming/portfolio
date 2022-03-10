<script lang="ts">
	import Fieldset from '$components/forms/field-set.svelte';
	import FieldLabel from '$components/forms/field-label.svelte';
	import { fetchCaseStudies } from '../../../db/fetch-case-studies';
	import { onMount } from 'svelte';
	import { formattedDateFromTimeStamp } from '$lib/dates/format-date';

	import RichText from '$components/fields/rich-text/rich-text.svelte';
	import type { Nullable } from '@repo/shared';
	import type { CaseStudy } from '@repo/db';

	let formData = {
		authors: [],
		publishDate: '',
		updatedDate: '',
		createdAt: '',
		modifiedAt: ''
	};

	let contentLoading = true;
	let caseStudies: Nullable<CaseStudy[]>;

	onMount(async () => {
		caseStudies = await fetchCaseStudies();
		console.log(caseStudies);
		contentLoading = false;
	});
</script>

<div class="w-full flex flex-row">
	<section class="w-1/4 min-w-[300px] bg-slate-200 p-4">
		<h1>Case Studies</h1>
		{#if contentLoading}
			<span>loading...</span>
		{:else if caseStudies}
			{#each caseStudies as caseStudy}
				<article class="w-full bg-slate-400 rounded overflow-hidden p-4 text-sm">
					<div class="flex flex-row flex-wrap w-full">
						<span class="text-xs"
							><span class="font-bold">Published:</span>
							{caseStudy.date_published &&
								formattedDateFromTimeStamp(caseStudy.date_published)}</span
						>
						<span class="text-xs"
							><span class="font-bold">Updated:</span>
							{caseStudy.date_modified && formattedDateFromTimeStamp(caseStudy.date_modified)}</span
						>
					</div>

					<span>Case Study</span>

					<h1>{caseStudy.title}</h1>

					<span>{caseStudy.summary}</span>

					<div class="flex flex-row flex-wrap w-full">
						<span class="text-xs"
							><span class="font-bold">Created:</span>
							{caseStudy._created_at && formattedDateFromTimeStamp(caseStudy._created_at)}</span
						>
						<span class="text-xs"
							><span class="font-bold">Modified:</span>
							{caseStudy._updated_at && formattedDateFromTimeStamp(caseStudy._updated_at)}</span
						>
					</div>
				</article>
			{/each}
		{:else}
			<div>Failed to load case studies.</div>
		{/if}
	</section>

	<section class="w-full">
		<div class="field">
			<RichText />
		</div>

		<form class="flex flex-col gap-8">
			<div class="field">
				<label for="id">ID</label>
				<input readonly class="field__input" type="text" id="id" name="id" />
			</div>

			<Fieldset legend="Dates">
				<div class="field">
					<FieldLabel forId="publish-date">Publish Date</FieldLabel>
					<input
						class="field__input"
						type="date"
						id="publish-date"
						name="publish-date"
						placeholder="{`${Date.now()}`}"
					/>
				</div>

				<div class="field">
					<label for="updated-date">Updated Date</label>
					<input
						class="field__input"
						type="date"
						id="updated-date"
						name="updated-date"
						placeholder="{`${Date.now()}`}"
					/>
				</div>

				<div class="field">
					<label for="created-at">Created At</label>
					<input
						class="field__input"
						readonly
						type="date"
						id="created-at"
						name="created-at"
						placeholder=""
					/>
				</div>

				<div class="field">
					<label for="modified-at">Created At</label>
					<input
						class="field__input"
						readonly
						type="date"
						id="modified-at"
						name="modified-at"
						placeholder=""
					/>
				</div>
			</Fieldset>

			<Fieldset legend="Metadata">
				<div class="field">
					<label for="authors">Author</label>
					<input class="field__input" type="text" id="authors" name="authors" value="" />
				</div>

				<div class="field">
					<label for="view count">Page Views</label>
					<input
						class="field__input"
						readonly
						type="text"
						id="view count"
						name="view count"
						value="110"
					/>
				</div>

				<div class="field">
					<label for="slug">Slug</label>
					<input class="field__input" type="text" id="slug" name="slug" />
				</div>
			</Fieldset>

			<Fieldset legend="Content">
				<div class="field">
					<label for="title">Title</label>
					<input class="field__input" type="text" id="title" name="title" placeholder="Title" />
				</div>

				<div class="field">
					<label for="summary">Summary</label>
					<textarea class="field__input" id="summary" name="summary" rows="4" placeholder="Summary"
					></textarea>
				</div>

				<div class="field">
					<label for="body">Body</label>
					<textarea class="field__input" id="body" name="body" rows="10"></textarea>
				</div>
			</Fieldset>
		</form>
	</section>
</div>

<style>
	form {
		margin: auto;
		width: 100%;
		max-width: 600px;
	}
	.field {
		@apply w-full;
	}
	.field__input {
		@apply w-full border-[1px] border-solid border-slate-300 p-2;
	}
</style>
