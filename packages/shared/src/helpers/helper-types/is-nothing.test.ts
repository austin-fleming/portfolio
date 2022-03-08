import { isNothing } from './is-nothing';

describe('is nothing', () => {
	it('returns true if nothing', () => {
		expect(isNothing(null)).toBe(true);
		expect(isNothing(undefined)).toBe(true);
		// @ts-expect-error: testing empty call
		expect(isNothing()).toBe(true);
	});

	it('returns false if something', () => {
		expect(isNothing('')).toBe(false);
		expect(isNothing(0)).toBe(false);
		expect(isNothing(-0)).toBe(false);
		// @ts-expect-error: compilation target doesn't matter for 0n
		expect(isNothing(0n)).toBe(false);
		expect(isNothing(NaN)).toBe(false);
		expect(isNothing([])).toBe(false);
		expect(isNothing({})).toBe(false);

		expect(isNothing('hello')).toBe(false);
		expect(isNothing(10)).toBe(false);
	});
});
