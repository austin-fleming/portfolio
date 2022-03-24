import { ApiError } from '@lib/error-handling/api-error';
import type { ErrorRequestHandler } from 'express';

export const errorFallback: ErrorRequestHandler = (error, request, response, next) => {
	console.error('Error caught in fallback middleware:', error);

	const fallbackError = new ApiError(
		'INTERNAL_SERVER_ERROR',
		'Unexpected error',
		"Something went wrong where it wasn't expected, and the developer has been notified. In the meantime, try again."
	);

	response.status(fallbackError.status).json(fallbackError.getPublicDescription());
};
