import { formattedDateFromTimeStamp } from './format-date';

describe('formatted date from time stamp', () => {
	it('converts timestamp to MMM DD, YYYY, HH:MM PM', () => {
		expect(formattedDateFromTimeStamp('2022-03-07T06:36:05+00:00')).toBe('Mar 06, 2022, 10:36 PM');
		expect(formattedDateFromTimeStamp('2022-03-07')).toBe('Mar 07, 2022');
	});

	it('returns empty string if not a timestamp', () => {
		expect(formattedDateFromTimeStamp('hello')).toBe('');
	});
});
