import { createEventDispatcher } from 'svelte';

export const mergeDraftDispatcher = () => {
	const dispatch = createEventDispatcher();

	return () => dispatch('mergedraft');
};
