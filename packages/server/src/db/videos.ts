import { getPostgrestError } from '@lib/error-handling/get-postgrest-error';
import type { Video } from '@repo/db';
import { ApiError, DataOrError } from '@repo/shared';
import { supabase } from './client';

const get = async (): Promise<DataOrError<Video[]>> => {
	try {
		const { data, error } = await supabase.from<Video>('video').select('*');

		if (error) throw new ApiError('INTERNAL_SERVER_ERROR', 'Server Error', error.message);

		if (!data) throw new ApiError('NOT_FOUND', 'Could not find videos in database');

		return { data, error: undefined };
	} catch (error) {
		return { data: undefined, error };
	}
};

const getById = async (id: string): Promise<DataOrError<Video>> => {
	try {
		if (!id) throw new ApiError('BAD_REQUEST', 'Bad Request', 'ID was missing for GET request.');

		const { data, error } = await supabase.from<Video>('video').select('all').eq('id', id).single();

		// TODO: differentiate between a bad request and other problems.
		if (error) throw new ApiError('INTERNAL_SERVER_ERROR', 'Unknown error.', error.message);

		// TODO: Should failed filters return an error, or just an empty response?
		//       Similarly, should any get request return an array, and failed gets are just empty?
		if (!data)
			throw new ApiError('NOT_FOUND', 'Not Found', `Could not find video with id of ${id}.`);

		return { data, error };
	} catch (error) {
		return { data: undefined, error };
	}
};

const post = async (video: Video): Promise<DataOrError<Video>> => {
	try {
		console.log('INCOMING DATA:', video);
		// NOTE: will return an array by default, but this function only accepts one video at a time.
		//       Therefore, single is called to reduce array down to only one item.
		const { data, error } = await supabase.from<Video>('video').insert([video]).single();
		console.log('SUPABASE ERROR:', error);
		// TODO: differentiate between a bad request and other problems.
		if (error) {
			throw getPostgrestError(error);
		}

		if (!data) throw new ApiError('NOT_FOUND', 'Could not find videos in database');

		return { data, error };
	} catch (error) {
		return { data: undefined, error };
	}
};

const put = async (video: Video): Promise<DataOrError<Video>> => {
	try {
		const { data: row, error: rowFetchError } = await supabase
			.from<Video>('video')
			.select()
			.eq('id', video?.id)
			.single();
		if (!row || rowFetchError)
			throw new ApiError(
				'NOT_FOUND',
				'Video not found',
				`Could not find video with id of "${video?.id}" to update.`
			);

		const { data, error } = await supabase.from<Video>('video').upsert(video);
		// TODO: better clarify error
		if (error) throw new ApiError('INTERNAL_SERVER_ERROR', 'Server Error', error.message);

		if (!data)
			throw new ApiError('NOT_FOUND', `Could not perform PUT on row with id: ${video?.id}`);

		return { data, error };
	} catch (error) {
		return { data: undefined, error };
	}
};

const remove = async (id: string): Promise<DataOrError<Video>> => {
	try {
		console.log('ID TO DELETE', id);

		const { data, error } = await supabase.from<Video>('video').delete().eq('id', id);

		// TODO: better clarify error
		if (error) throw new ApiError('INTERNAL_SERVER_ERROR', 'Server Error', error.message);

		return { data, error };
	} catch (error) {
		return { data: undefined, error };
	}
};

export default {
	get,
	getById,
	post,
	put,
	remove
};
