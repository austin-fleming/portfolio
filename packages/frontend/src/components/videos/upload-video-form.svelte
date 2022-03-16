<script lang="ts">
	import type { Nullable } from '@repo/shared';
	import { createUpload } from '@mux/upchunk';
	import Button from '$components/button.svelte';

	type FormState = 'READY' | 'UPLOADING' | 'PREPARING' | 'ERROR' | 'SUCCESS';
	let formState: FormState = 'READY';
	let errorMessage: Nullable<string>;

	let hasFileSelected = false;

	let uploadProgress: Nullable<number>;
	let uploadId: Nullable<string>;

	let fileUploadInput: HTMLInputElement;
	let files: Nullable<FileList>;
	let selectedFile: Nullable<File>;

	// const handleUpload = (event: Event) => {
	// 	console.log(files);
	// 	console.log(fileUploadInput.files);
	// };

	const beginUpload = (file: File) => {
		formState = 'UPLOADING';

		const endpoint = '';
	};

	// TODO: there should be a more idiomatic way to detect "selectedFile" resetting.
	const handleFormReset = () => {
		files = undefined;
		errorMessage = undefined;
		formState = 'READY';
	};

	const handleFormSubmit = (event: SubmitEvent) => {
		try {
			if (!selectedFile) throw new Error('Please select a file to upload.');

			const { name, size } = selectedFile;

			window.alert(
				JSON.stringify({
					name,
					size
				})
			);

			beginUpload(selectedFile);
		} catch (error) {
			console.error('Failed to upload due to:', error);
			errorMessage = 'Something went wrong when trying to upload the video.';
			formState = 'ERROR';
		}
	};

	// TODO: move to shared
	const roundToTenths = (value: number) => Math.round(value * 10) / 10;
	// TODO: move to shared
	const bytesToMegabytes = (value: number) => value / 1_000_000;

	$: selectedFile = files && files.length > 0 ? files[0] : undefined;
</script>

<!-- <p>Selected: {!!selectedFile}</p>

{#if selectedFile}
	<div>
		File Name: {selectedFile.name}. File size: {roundToTenths(
			bytesToMegabytes(selectedFile.size)
		)}mb
	</div>
{/if} -->

{#if formState === 'READY'}
	<form
		class="flex flex-col items-center max-w-[600px] m-auto"
		on:submit|preventDefault="{handleFormSubmit}"
	>
		<label for="upload" class="polybutton" class:sr-only="{selectedFile}">
			Select Video
			<input
				id="upload"
				type="file"
				name="upload"
				bind:files
				bind:this="{fileUploadInput}"
				accept="video/*"
				required
				class="sr-only"
			/>
		</label>

		{#if selectedFile}
			<button type="submit" class="polybutton"
				>Upload Video <span class="font-light"
					>: {roundToTenths(bytesToMegabytes(selectedFile.size))} MB</span
				></button
			>

			<Button buttonType="reset" style="text" interaction="cancel" on:click="{handleFormReset}"
				>Clear Selection</Button
			>
		{/if}
	</form>
{:else if formState === 'UPLOADING'}
	<p>Uploading</p>
{:else if formState === 'PREPARING'}
	<p>Preparing</p>
{:else if formState === 'SUCCESS'}
	<p>Error</p>
{/if}

{#if errorMessage}
	<!-- TODO: have a message bar component -->
	<div class="p-4 border-2 border-solid border-ui-error text-ui-error bg-ui-error-bg">
		<p>Uh oh...</p>
		<p>{errorMessage}</p>
		<Button on:click="{handleFormReset}" style="text" color="error">Try again</Button>
	</div>
{/if}

<style>
	.polybutton {
		@apply w-full text-center text-2xl font-bold py-[0.5em] px-[2em] border-[0.15em] border-solid border-primary rounded-full cursor-pointer;
	}
</style>
