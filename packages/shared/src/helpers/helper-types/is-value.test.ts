import { isFalse, isTrue, isNull, isUndefined } from './is-value';

describe('is false', () => {
	it('returns true if false', () => {
		expect(isFalse(false)).toBe(true);
	});

	it('returns false if not false', () => {
		expect(isFalse('false')).toBe(false);
		expect(isFalse(null)).toBe(false);
		expect(isFalse(undefined)).toBe(false);
		expect(isFalse('')).toBe(false);
		expect(isFalse(true)).toBe(false);
		expect(isFalse(0)).toBe(false);
		expect(isFalse(-0)).toBe(false);
	});
});

describe('is true', () => {
	it('returns true if true', () => {
		expect(isTrue(true)).toBe(true);
	});

	it('returns false if not true', () => {
		expect(isTrue('true')).toBe(false);
		expect(isTrue('hello')).toBe(false);
		expect(isTrue(1)).toBe(false);
	});
});

describe('is null', () => {
	it('returns true if null', () => {
		expect(isNull(null)).toBe(true);
	});

	it('returns false if not null', () => {
		expect(isNull('null')).toBe(false);
		expect(isNull(undefined)).toBe(false);
		expect(isNull('false')).toBe(false);
		expect(isNull('')).toBe(false);
		expect(isNull(true)).toBe(false);
		expect(isNull(0)).toBe(false);
		expect(isNull(-0)).toBe(false);
	});
});

describe('is undefined', () => {
	it('returns true if undefined', () => {
		expect(isUndefined(undefined)).toBe(true);
	});

	it('returns false if not undefined', () => {
		expect(isUndefined('undefined')).toBe(false);
		expect(isUndefined(null)).toBe(false);
		expect(isUndefined('false')).toBe(false);
		expect(isUndefined('')).toBe(false);
		expect(isUndefined(true)).toBe(false);
		expect(isUndefined(0)).toBe(false);
		expect(isUndefined(-0)).toBe(false);
	});
});
