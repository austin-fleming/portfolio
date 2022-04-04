import { ValidationError } from 'yup';

export const isYupError = (error: unknown): error is ValidationError =>
	error instanceof ValidationError;
