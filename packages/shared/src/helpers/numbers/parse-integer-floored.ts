/**
 * Attempts to parse a integer from an unknown value type. Numbers are floor rounded.
 */
export const parseIntegerFloored = (value: unknown): number | undefined => {
	if (typeof value !== 'number' && typeof value !== 'string') return;

	const maybeNumber = Number(value);

	if (Number.isNaN(maybeNumber)) return;

	return Math.floor(maybeNumber);
};
