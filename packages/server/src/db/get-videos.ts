import type { Video } from '@repo/db';
import { ApiError, DataOrError } from '@repo/shared';
import { supabase } from './client';

export const getVideos = async (): Promise<DataOrError<Video[]>> => {
	try {
		const { data, error } = await supabase.from<Video>('video').select('*');

		if (error) throw new ApiError('INTERNAL_SERVER_ERROR', 'Server Error', error.message);

		if (!data) throw new ApiError('NOT_FOUND', 'Could not find videos in database');

		return { data, error: undefined };
	} catch (error) {
		return { data: undefined, error };
	}
};
