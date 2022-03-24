import { isString } from './is-string';

describe('is string', () => {
	it('returns true if input is string', () => {
		expect(isString('')).toBe(true);
		expect(isString(' ')).toBe(true);
		expect(isString('hello')).toBe(true);
		expect(isString('6')).toBe(true);
		/* eslint-disable unicorn/new-for-builtins */
		expect(isString(new String('howdy'))).toBe(true);
		expect(isString(new String(''))).toBe(true);
		/* eslint-enable unicorn/new-for-builtins */
		expect(isString(String('howdy'))).toBe(true);
		expect(isString(String(''))).toBe(true);
	});

	it('returns false is input is not string', () => {
		expect(isString(null)).toBe(false);
		expect(isString(undefined)).toBe(false);
		expect(isString(6)).toBe(false);
		expect(isString(/(test)/)).toBe(false);
		expect(isString(['hello'])).toBe(false);
		expect(isString({ name: 'string' })).toBe(false);
	});
});
