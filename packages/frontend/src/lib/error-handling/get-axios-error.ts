import type { Nullable } from '@repo/shared';
import axios from 'axios';

export const getAxiosError = (error: unknown): Nullable<Error> => {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log('|> Axios Response Error');
			console.log('|', error.response.data);
			console.log('|', error.response.status);
			console.log('|', error.response.headers);

			return new Error('Axios response error');
		}

		if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log('|> Axios Request Error');
			console.log('|', error.request);

			return new Error('Axios request error');
		}

		console.log('|> Axios Unknown Error');
		console.log('|', error);
		return new Error('Unknown axios error');
	}
};
