<script lang="ts">
</script>

<div>
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
