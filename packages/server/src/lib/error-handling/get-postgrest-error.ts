import { ApiError } from './api-error';
import type { PostgrestError } from '@supabase/supabase-js';

export const getPostgrestError = (error: PostgrestError): ApiError => {
	// https://www.postgresql.org/docs/current/errcodes-appendix.html
	const commonPostgresErrors: Record<PostgrestError['code'], ApiError> = {
		'1053': new ApiError('TIMEOUT', 'Database server timed out.', error.message),
		'23502': new ApiError('BAD_REQUEST', 'Not null violation', error.message),
		'23505': new ApiError(
			'CONFLICT',
			'There was a conflict when updating the database',
			error.message
		),
		'42501': new ApiError('FORBIDDEN', 'Action not permitted.', error.message),
		'42703': new ApiError('BAD_REQUEST', "Column doesn't exist", error.message)
	};

	return (
		commonPostgresErrors[error.code] ||
		new ApiError('INTERNAL_SERVER_ERROR', `${error.code} Error`, error.message)
	);
};
