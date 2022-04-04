import { SERVER_HOST } from '$lib/api/config';
import type { Video } from '@repo/db';
import type { DataOrError } from '@repo/shared';
import axios, { type AxiosError } from 'axios';

type GetVideosOptions = {};

export const getVideos = async (/* options?: GetVideosOptions */): Promise<
	DataOrError<Video[]>
> => {
	try {
		const queryUrl = `${SERVER_HOST}/api/videos`;

		const response = await axios.get<Video[]>(queryUrl);

		const { data } = response;

		if (!data) throw new Error('No videos returned from request.');

		return { data, error: undefined };
	} catch (error) {
		let errorMessage;

		if (axios.isAxiosError(error)) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);

				errorMessage = 'Axios response error';
			}

			if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);

				errorMessage = 'Axios request error';
			}
		}
		// Either not an axios error, or is but not response or request error
		// Something happened in setting up the request that triggered an Error
		console.error(error);
		errorMessage = 'A non-axios related error occurred:';

		return { data: undefined, error: new Error(errorMessage) };
	}
};
