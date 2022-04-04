<script lang="ts">
	import Header from '$components/header.svelte';
	import '$styles/app.css';
</script>

<Header />

<main class="w-full min-h-screen h-full">
	<slot />
</main>
