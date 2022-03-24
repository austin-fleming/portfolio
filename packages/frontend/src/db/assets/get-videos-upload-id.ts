import { dev as isDevelopmentEnvironment } from '$app/env';
import axios from 'axios';

const commonErrorMessages = {
	401: `Not Authenticated: Please log in first.`,
	403: `Not Authorized: Doesn't look like you're allowed to do this.`,
	404: `Not Found: Doesn't seem like there's anything here. Maybe try again or modifying your search.`,
	422: 'Validation Error',
	500: 'Server Error: This might be a problem with our system. You may want to try again.'
};

const defaultErrorMessage = 'Error: Something unexpected went wrong. Consider trying again.';

// TODO: needs to take in auth token
export const getVideoUploadId = async () => {
	const serverHost = isDevelopmentEnvironment
		? import.meta.env.VITE_SERVER_HOST_DEVELOPMENT
		: import.meta.env.VITE_SERVER_HOST_PRODUCTION;
	const endpoint = `${serverHost}/assets/videos`;

	try {
		const response = await axios.post(endpoint);
		return response.data;
	} catch (error) {
		if (error.response) {
		} else if (error.request) {
		} else {
		}
	}
};
