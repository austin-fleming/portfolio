<script lang="ts">
	export let legend: string;
</script>

<fieldset class="w-full bg-slate-50">
	<legend class="w-full font-bold leading-none mb-4">{legend}</legend>
	<div class="w-full border-l-[1.5px] border-solid border-slate-800 pl-4 flex flex-col gap-4">
		<slot />
	</div>
</fieldset>

<style>
	fieldset {
		border: 0;
		margin: 0;
		min-width: 0;
		padding: 0.01em 0 0 0;
	}
	legend {
		display: table;
		padding: 0;
		float: left;
		width: 100%;
	}
	legend + * {
		clear: both;
	}
	:global(body):not(:-moz-handler-blocked) fieldset {
		display: table-cell;
	}
</style>
