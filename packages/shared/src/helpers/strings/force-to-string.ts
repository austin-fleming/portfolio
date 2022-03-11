import { isNothing } from '..';

export const forceToString = (value: unknown) => {
	if (isNothing(value)) return;

	return `${value}`;
};
