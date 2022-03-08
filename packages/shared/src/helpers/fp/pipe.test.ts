import { pipe } from './pipe';

describe('pipe', () => {
	const addPeriod = (value: string) => `${value}.`;

	it('works with 1 function', () => {
		expect(pipe(addPeriod)('')).toBe('.');
	});

	it('works with 10 functions', () => {
		expect(
			pipe(
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod,
				addPeriod
			)('')
		).toBe('..........');
	});
});
