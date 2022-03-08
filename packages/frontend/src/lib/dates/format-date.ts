export const formattedDateFromTimeStamp = (timestamp: string) => {
	// TODO: catch for sure or leave to TS?
	if (!timestamp) return '';

	const date: Date | 'Invalid Date' = new Date(timestamp);

	/* eslint-disable unicorn/prefer-number-properties */
	// @ts-expect-error: need to force date into isNaN here
	if (!(date instanceof Date && !isNaN(date))) return '';
	/* eslint-enable unicorn/prefer-number-properties */

	// if T information is supplied, show it
	if (timestamp.split('T').length > 1) {
		return date.toLocaleString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
	}

	// if there's no 'T' info in timestamp, force to UTC and don't show time
	return date.toLocaleString('en-US', {
		timeZone: 'UTC',
		month: 'short',
		day: '2-digit',
		year: 'numeric'
	});
};
