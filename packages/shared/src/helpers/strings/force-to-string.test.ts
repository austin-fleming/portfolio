import { forceToString } from './force-to-string';

describe('force to string', () => {
	it('returns undefined if input is Nothing', () => {
		expect(forceToString(null)).toBeUndefined();
		expect(forceToString(undefined)).toBeUndefined();
	});

	it('returns a string for any non-Nothing input', () => {
		expect(forceToString([])).toBe('');
		expect(forceToString({})).toBe('[object Object]');
		expect(forceToString(NaN)).toBe('NaN');
		expect(forceToString(-0)).toBe('0');
		expect(forceToString('')).toBe('');
	});
});
