import { isStrictFalsy } from '.';

describe('is strict falsy', () => {
	test('returns true for null, undefined, or false', () => {
		expect(isStrictFalsy(null)).toBe(true);
		expect(isStrictFalsy(undefined)).toBe(true);
		expect(isStrictFalsy(false)).toBe(true);
	});

	test('returns false for all other values', () => {
		expect(isStrictFalsy('false')).toBe(false);
		expect(isStrictFalsy('null')).toBe(false);
		expect(isStrictFalsy('undefined')).toBe(false);
		expect(isStrictFalsy('')).toBe(false);
		expect(isStrictFalsy(0)).toBe(false);
		expect(isStrictFalsy(-0)).toBe(false);
		expect(isStrictFalsy(NaN)).toBe(false);
		expect(isStrictFalsy('hello')).toBe(false);
		expect(isStrictFalsy(6)).toBe(false);
		expect(isStrictFalsy({})).toBe(false);
		expect(isStrictFalsy([])).toBe(false);
	});
});
