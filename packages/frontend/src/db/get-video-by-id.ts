import { SERVER_HOST } from '$lib/api/config';
import type { Video } from '@repo/db';
import axios from 'axios';

export const getVideoById = async (id: string) => {
	try {
		const queryUrl = `${SERVER_HOST}/api/videos/${id}`;

		const { data } = await axios.get<Video>(queryUrl);

		return { data, error: undefined };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}

			if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			}
		} else {
			// Either not an axios error, or is but not response or request error
			// Something happened in setting up the request that triggered an Error
			console.error('Error', 'A non-axios related error occured:', error);
		}

		return { data: undefined, error };
	}
};
