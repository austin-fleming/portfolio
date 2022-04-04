import { objectsDeeplyEqual } from './objectsDeeplyEqual';

describe('objects deeply equal', () => {
	it('returns true for objects of equal value.', () => {
		expect(objectsDeeplyEqual({ a: '' }, { a: '' })).toBe(true);
		expect(objectsDeeplyEqual({}, {})).toBe(true);
		expect(objectsDeeplyEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
	});

	it('returns false for objects of different value.', () => {
		expect(objectsDeeplyEqual({ a: '' }, { b: 1 })).toBe(false);
		expect(objectsDeeplyEqual({ a: { b: 1 } }, { a: 1 })).toBe(false);
		expect(objectsDeeplyEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
		expect(objectsDeeplyEqual({ a: '' }, { a: 1 })).toBe(false);
		expect(objectsDeeplyEqual({ a: '' }, { a: null })).toBe(false);
	});
});
