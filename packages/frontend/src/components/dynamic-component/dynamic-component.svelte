<script lang="ts">
	import DivComponent from './div.svelte';
	import SectionComponent from './section.svelte';

	export let element: 'div' | 'section' = 'div';

	const props = {
		class: 'test test2'
	};

	let currentElement = { div: DivComponent, section: SectionComponent }[`${element}`];
</script>

<svelte:component this="{currentElement}" {...props}><slot /></svelte:component>
