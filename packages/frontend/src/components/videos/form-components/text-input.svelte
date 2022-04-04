<script lang="ts">
	import Label from './label.svelte';

	export let label: string;
	export let id: string;
	export let inputValue: string;
	export let onInput: () => void;
	export let isRequired = false;
</script>

<Label forId="{id}">
	{label}
	{#if isRequired}*{/if}
	<input
		id="{id}"
		type="text"
		bind:value="{inputValue}"
		on:input="{onInput}"
		class="block w-full mt-2 border-2 border-solid border-primary py-[0.5em] px-[0.5em]"
	/>
</Label>
