import { createEventDispatcher } from 'svelte';

export const selfDestructDispatcher = () => {
	const dispatch = createEventDispatcher();

	return () => dispatch('selfdestruct');
};
