<script lang="ts">
	import { prefetch } from '$app/navigation';

	export let title: string;
	export let summary: string;
	export let href: string;
</script>

<article class="p-8 border-4 border-solid border-slate-900">
	<h1>{title}</h1>
	<p>{summary}</p>
	<a href="{href}" sveltekit:prefetch>Keep Reading</a>
</article>
