<script lang="ts">
	export let legend: string;
</script>

<fieldset class="w-full bg-slate-50">
	<legend class="w-full font-bold leading-none mb-4">{legend}</legend>
	<div class="w-full border-l-[1.5px] border-solid border-slate-800 pl-4 flex flex-col gap-4">
		<slot />
	</div>
</fieldset>
