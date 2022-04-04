import { getAxiosError } from '$lib/error-handling/get-axios-error';
import type { Video } from '@repo/db';
import type { Nullable } from '@repo/shared';
import axios from 'axios';
import { API_HOST } from './config';

// Either returns videos, or an empty array.
const getAll = async (): Promise<Video[]> => {
	const queryUrl = `${API_HOST}/videos`;

	try {
		const { data } = await axios.get<Video[]>(queryUrl);

		if (!data) throw new Error('No videos returned from request');

		return data;
	} catch (error) {
		const configuredError =
			getAxiosError(error) || new Error(`Something went wrong: ${JSON.stringify(error)}`);

		console.error(configuredError);

		// TODO: should instead it return undefined and the default gets handled in the consuming function?
		return [];
	}
};

const put = async (video: Video): Promise<Nullable<Video>> => {
	if (!video?.id) return;

	const queryUrl = `${API_HOST}/videos/${video.id}`;

	try {
		const { data } = await axios.put<Video>(queryUrl, video);

		if (!data) throw new Error(`Failed to PUT video with shape: ${JSON.stringify(video)}`);

		return data;
	} catch (error) {
		const configuredError =
			getAxiosError(error) || new Error(`Something went wrong: ${JSON.stringify(error)}`);

		console.error(configuredError);

		// TODO: should instead it return undefined and the default gets handled in the consuming function?
		return;
	}
};

const post = async (video: Video): Promise<Nullable<Video>> => {
	try {
		if (!video) throw new Error('Failed to POST video because no document was provided.');
		if (!video.id) throw new Error('Failed to POST video because document did not have an id.');

		const queryUrl = `${API_HOST}/videos/${video.id}`;

		const { data } = await axios.post<Video>(queryUrl, video);

		if (!data) throw new Error(`Failed to POST video with shape: ${JSON.stringify(video)}`);

		return data;
	} catch (error) {
		const configuredError =
			getAxiosError(error) || new Error(`Something went wrong: ${JSON.stringify(error)}`);

		console.error(configuredError);

		// TODO: should instead it return undefined and the default gets handled in the consuming function?
		return;
	}
};

const remove = async (id: string): Promise<Nullable<Video>> => {
	if (!id) return;

	const queryUrl = `${API_HOST}/videos/${id}`;

	try {
		const { data } = await axios.delete<Video>(queryUrl);

		if (!data) throw new Error(`Failed to DELETE video with id: ${id}`);

		return data;
	} catch (error) {
		const configuredError =
			getAxiosError(error) || new Error(`Something went wrong: ${JSON.stringify(error)}`);

		console.error(configuredError);

		// TODO: should instead it return undefined and the default gets handled in the consuming function?
		return;
	}
};

export const videosService = {
	getAll,
	post,
	put,
	remove
};
