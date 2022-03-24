import { HttpStatusCode } from '@lib/http-status-code';

// Based on https://www.toptal.com/nodejs/node-js-error-handling
export class ApiError extends Error {
	public readonly name: string;
	public readonly status: HttpStatusCode;
	public readonly isOperational: boolean;
	public readonly details: string;

	constructor(
		statusTitle: keyof typeof HttpStatusCode,
		message: string,
		details = '',
		isOperational = true
	) {
		super(message);
		// restore prototype chain that "message" breaks.
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = 'ApiError';
		this.status = HttpStatusCode[`${statusTitle}`];
		this.details = details;
		// NOTE: allows dividing run time error (operational) from programmer errors such as an undefined .env value
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}

	getPublicDescription() {
		return {
			details: this.details,
			message: this.message,
			name: this.name,
			status: this.status
		};
	}
}

export const isApiError = (maybeApiError: unknown): maybeApiError is ApiError =>
	maybeApiError instanceof ApiError;
