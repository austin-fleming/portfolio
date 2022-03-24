import { isApiError } from '@lib/error-handling/api-error';
import type { ErrorRequestHandler } from 'express';

export const errorLogger: ErrorRequestHandler = (error, request, response, next) => {
	console.error(
		'\n\n---',
		'Error logger:\n',
		`API Error: ${isApiError(error)}\n`,
		error,
		'\n\n---'
	);
	next(error);
};
