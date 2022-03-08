import { parseBoolFromString } from './parse-bool-from-string';

describe('parse bool from string', () => {
	it("should convert 'string' to 'boolean'", () => {
		expect(parseBoolFromString('true')).toBe(true);
		expect(parseBoolFromString('TrUe')).toBe(true);
		expect(parseBoolFromString('false')).toBe(false);
		expect(parseBoolFromString('FaLse')).toBe(false);
	});

	it('should return undefined if cannot be parsed', () => {
		expect(parseBoolFromString('')).toBeUndefined();
		expect(parseBoolFromString('hello')).toBeUndefined();
	});
});
