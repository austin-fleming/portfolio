import type { Nothing } from '@repo/shared';
import type { ApiError } from './api-error';

export type DataOrError<DataType> =
	| { data: DataType; error: Nothing }
	| { data: Nothing; error: ApiError | Error };
