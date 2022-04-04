import { createEventDispatcher } from 'svelte';

export const dropChangesDispatcher = () => {
	const dispatch = createEventDispatcher();

	return () => dispatch('dropchanges');
};
