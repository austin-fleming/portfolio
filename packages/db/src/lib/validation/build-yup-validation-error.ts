import { isYupError } from './is-yup-error';
import { errorHandling } from '@repo/shared';

export const buildYupValidationError = (error: unknown) => {
	if (isYupError(error)) {
		console.error('~~~~~');
		console.error('~~Yup Errors~~');
		console.error('~~Inner:', JSON.stringify(error.inner));
		console.error('~~Errors:', error.errors);
		console.error('~~Path:', error.path);
		console.error('~~');
		console.error({ error });
		console.error('~~~~~');

		const reduceWithNewlines = (stringArray: string[]): string =>
			/* eslint-disable-next-line unicorn/no-array-reduce */
			stringArray.reduce((previous, current) => `${previous}\n${current}`, '');

		const errorDetails = error.message + '.\n' + reduceWithNewlines(error.errors);

		console.error('%%%%%\n\n');
		for (const current of error.inner) {
			console.error(JSON.stringify(current));
		}
		console.error('\n\n%%%%%');

		// throw new ApiError('BAD_REQUEST', 'One or more fields failed validation.', errorDetails)
		return new Error('YUP ERROR:', error);
	}

	return new Error('Something went wrong during validation.');
};
