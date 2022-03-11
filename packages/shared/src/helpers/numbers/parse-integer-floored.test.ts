import { parseIntegerFloored } from './parse-integer-floored';

describe('parse integer floored', () => {
	it('returns a floor rounded integer if input is parseable', () => {
		expect(parseIntegerFloored(1)).toBe(1);
		expect(parseIntegerFloored('1')).toBe(1);
		expect(parseIntegerFloored('1.5')).toBe(1);
		expect(parseIntegerFloored('01.5')).toBe(1);
		expect(parseIntegerFloored('0')).toBe(0);
	});

	it('returns undefined if input is not parseable', () => {
		expect(parseIntegerFloored([])).toBeUndefined();
		expect(parseIntegerFloored({})).toBeUndefined();
		expect(parseIntegerFloored('hello')).toBeUndefined();
		expect(parseIntegerFloored('0.0.5')).toBeUndefined();
	});
});
