import { ApiError, isApiError } from '@lib/error-handling/api-error';
import type { ErrorRequestHandler, Response } from 'express';

/* const getErrorMessage = (error: Error): string => {
	if (error.stack) return error.stack;
	if (typeof error.toString() === 'function') return error.toString();
	return '';
};

const logErrorMessage = (error: Error) => {
	console.error(error);
	return error;
};

const isErrorStatusCode = (statusCode: number): boolean => statusCode >= 400 && statusCode < 600;

const getStatusCode = ({ error, response }: { error: any; response: Response }) => {
	const statusCodeFromError = error.status || error.statusCode;

	if (isErrorStatusCode(statusCodeFromError)) {
		return statusCodeFromError;
	}

	const statusCodeFromResponse = response.statusCode;
	if (isErrorStatusCode(statusCodeFromResponse)) {
		return statusCodeFromResponse;
	}

	return 500;
};

export const errorResponder: ErrorRequestHandler = (error, request, response, next) => {
	if (error.type === 'redirect') response.redirect('/error');
	else if (error.type === 'time-out') response.status(408).send(error);
	else next(error);
}; */

export const errorResponder: ErrorRequestHandler = (error, request, response, next) => {
	if (isApiError(error)) {
		response.status(error.status).json(error.getPublicDescription());
	} else {
		next(error);
	}
};
