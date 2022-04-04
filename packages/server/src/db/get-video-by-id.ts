import type { Video } from '@repo/db';
import { ApiError, DataOrError } from '@repo/shared';
import { supabase } from './client';

export const getVideoById = async (id: string): Promise<DataOrError<Video>> => {
	try {
		const { data, error } = await supabase.from<Video>('video').select('*').eq('id', id).single();

		console.error('Error at "getVideoById:', error);
		console.error('	Id was:', id);

		if (error)
			throw new ApiError(
				'NOT_FOUND',
				'No video found.',
				`Could not find video with an id of "${id}".`
			);

		return { data, error: undefined };
	} catch (error) {
		return { data: undefined, error };
	}
};
