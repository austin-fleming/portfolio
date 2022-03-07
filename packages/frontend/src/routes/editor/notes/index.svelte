<script lang="ts">
	import FieldLabel from '$components/forms/FieldLabel.svelte';
	import Fieldset from '$components/forms/Fieldset.svelte';
	import { fetchNotes } from '../../../db/fetchNotes';
	import { onMount } from 'svelte';
	import { formattedDateFromTimeStamp } from '$lib/dates/formatDate';

	let notes: [];
	let notesLoading = true;

	onMount(async () => {
		notes = await fetchNotes();
		console.log(notes);
		notesLoading = false;
	});
</script>

<div class="w-full h-screen flex flex-row">
	<section
		class="w-1/4 min-w-[300px] h-full overflow-y-scroll border-r-2 border-solid border-slate-500 p-4"
	>
		<h1>Notes</h1>

		<div class="w-full flex flex-col gap-4">
			{#if notesLoading}
				<span>Loading...</span>
			{:else}
				{#each notes as note}
					<article class="w-full bg-slate-400 rounded-md p-4">
						<p>{note.body}</p>

						<div class="w-full text-xs mt-4">
							<p>
								<span class="font-bold">Published:</span>
								{formattedDateFromTimeStamp(note._created_at)}
							</p>

							<p>
								<span class="font-bold">Updated:</span>
								{formattedDateFromTimeStamp(note._modified_at)}
							</p>
						</div>
					</article>
				{/each}
			{/if}
		</div>
	</section>

	<section class="w-full h-full overflow-y-hidden">
		<div class="min-h-full overflow-y-scroll flex flex-col justify-start items-center">
			<form class="form">
				<div class="field">
					<p>ID</p>
					<p class="field__input field__input--disabled">fdsahfsjkdafs78797fds89fds</p>
				</div>

				<div class="field">
					<p>Created</p>
					<p class="field__input field__input--disabled">Feb. 27, 2022</p>
				</div>

				<div class="field">
					<p>Last Edited</p>
					<p class="field__input field__input--disabled">Feb. 28, 2022</p>
				</div>

				<div class="field">
					<label for="edit-note">Edit Note</label>
					<textarea
						class="field__input"
						id="edit-note"
						name="edit-note"
						rows="2"
						aria-label="write note here"
						placeholder="Make some soup."></textarea>
				</div>

				<button class="btn btn--save" aria-label="save note">Save</button>
			</form>

			<form class="form">
				<button class="btn btn--delete" aria-label="delete note">Delete</button>
			</form>
		</div>
	</section>
</div>

<style>
	.form {
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
