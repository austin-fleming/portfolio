<script lang="ts">
	export let forId: string;
</script>

<label for="{forId}" class="w-full font-bold leading-none mb-4">
	<slot />
</label>
