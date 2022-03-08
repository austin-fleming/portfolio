import { isJust } from './is-just';

describe('is jest', () => {
	it('returns false if not just', () => {
		expect(isJust(null)).toBe(false);
		expect(isJust(undefined)).toBe(false);
		// @ts-expect-error: testing empty call
		expect(isJust()).toBe(false);
	});

	it('returns true if just', () => {
		expect(isJust('')).toBe(true);
		expect(isJust(0)).toBe(true);
		expect(isJust(-0)).toBe(true);
		// @ts-expect-error: compilation target doesn't matter for 0n
		expect(isJust(0n)).toBe(true);
		expect(isJust(NaN)).toBe(true);
		expect(isJust([])).toBe(true);
		expect(isJust({})).toBe(true);

		expect(isJust('hello')).toBe(true);
		expect(isJust(10)).toBe(true);
	});
});
