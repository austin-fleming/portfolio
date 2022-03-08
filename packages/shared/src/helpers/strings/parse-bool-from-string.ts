import type { Nothing } from '@helpers/helper-types';
import { toLowerCase } from './to-lower-case';

export const parseBoolFromString = (string: string): Nothing | boolean => {
	const normalizedString = toLowerCase(string);

	if (normalizedString === 'true') return true;
	if (normalizedString === 'false') return false;

	return undefined;
};
