import type { Video } from '@repo/db';
import type { DataOrError } from '@repo/shared';
import axios from 'axios';
import { API_HOST } from './config';

export const putVideo = async (data: Video): Promise<DataOrError<Video>> => {
	try {
		const endpoint = `${API_HOST}/videos`;

		const serverResponse = await axios.post(endpoint, data);

		console.log('putVideo response:', serverResponse);

		return { data: serverResponse.data, error: undefined };
	} catch (error) {
		// TODO: centralize axios errors into a common handler.
		let errorMessage: string;

		if (axios.isAxiosError(error)) {
			if (error.response) {
				const { data, status, headers } = error.response;
				console.log('~~RESPONSE ERROR~~');
				console.log({ data, headers, status });

				errorMessage = 'Axios response error';
			} else if (error.request) {
				console.log('~~REQUEST ERROR~~');
				console.log(error.request);

				errorMessage = 'Axios request error';
			} else {
				errorMessage = 'Axios error of neither request nor response type occurred.';
			}
		} else {
			console.error('Error', 'A non-axios related error occured:', error);

			errorMessage = 'A non-axios related error occurred.';
		}

		return { data: undefined, error: new Error(errorMessage) };
	}
};
