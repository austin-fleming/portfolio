import { toLowerCase } from './to-lower-case';

describe('to lower case', () => {
	it('should capitalize a string', () => {
		expect(toLowerCase('HELLO')).toBe('hello');
		expect(toLowerCase('Hello')).toBe('hello');
		expect(toLowerCase('hello')).toBe('hello');
	});
});
