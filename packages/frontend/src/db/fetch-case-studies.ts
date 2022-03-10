import axios from 'axios';
import type { ExpandedCaseStudy, CaseStudy } from '@repo/db';

// TODO: DRY-ify
type ServerResponse = {
	links: Record<string, string>;
	message: string;
};

// TODO: DRY-ify
const SERVER_HOST = import.meta.env.PROD
	? import.meta.env.VITE_SERVER_HOST_PRODUCTION
	: import.meta.env.VITE_SERVER_HOST_DEVELOPMENT;

// TODO: error checking
export const fetchCaseStudies = async () => {
	// TODO: sanitization
	try {
		const response = await axios.get<CaseStudy[]>(`${SERVER_HOST}/case-studies/`);
		console.log({ response });
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);

				return;
			}

			if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);

				return;
			}
		}

		// Either not an axios error, or is but not response or request error
		// Something happened in setting up the request that triggered an Error
		console.error('Error', 'A non-axios related error occured:', error);

		return;
	}

	/* try {
		const response = await fetch(`${SERVER_HOST}/case-studies/`);
		const json = await response.json();
		return json.data;
	} catch (error) {
		console.error(error);

		return 'errored';
	} */
};
