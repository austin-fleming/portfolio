<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	import Noop from './noop.svelte';

	export let id: string;
	export let visibleOnMount = true;
	export let isOpen = visibleOnMount;
	export let destroyOnClose = false;

	onMount(() => {
		if (visibleOnMount) {
			isOpen = true;
		}
	});

	onDestroy(() => {
		isOpen = false;
	});

	const outclickHandler = (node: Node) => {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				/* 
        Creates on:outclick event; unfortunately, typescript does not
        pick this up and requires poluting the JSX namespace.
				
        node.dispatchEvent(new CustomEvent('outclick'));
         */

				isOpen = false;
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	};

	function closeButtonHandler() {
		isOpen = false;
	}
</script>

<div
	id="{id}"
	use:outclickHandler
	class="fixed top-0 left-0 bg-background border-2 border-solid border-primary"
	transition:blur="{{ delay: 150, duration: 200 }}"
>
	<button type="button" on:click="{closeButtonHandler}">X</button>
	<slot />
</div>
