import axios from 'axios';
import type { ExpandedCaseStudy, CaseStudy } from '@repo/db';
import { SERVER_HOST } from '$lib/api/config';

// TODO: DRY-ify
type ServerResponse = {
	links: Record<string, string>;
	message: string;
};

type GetCaseStudiesOptions = {
	limit?: number;
	offset?: number;
	slug?: string;
};
// TODO: error checking
export const getCaseStudies = async (options?: GetCaseStudiesOptions) => {
	// TODO: sanitization
	try {
		let queryUrl = `${SERVER_HOST}/case-studies`;

		if (options?.limit || options?.offset || options?.slug) {
			const { limit, offset, slug } = options;

			queryUrl = `${queryUrl}?`;

			if (limit) {
				queryUrl = `${queryUrl}&limit=${limit}`;
			}
			if (offset) {
				queryUrl = `${queryUrl}&offset=${offset}`;
			}
			if (slug) {
				queryUrl = `${queryUrl}&slug=${slug}`;
			}
		}

		const response = await axios.get<CaseStudy[]>(queryUrl);

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

/* export const fetchCaseStudyBySlug = async (slug: string) => {
	try {
		const response = await axios.get<CaseStudy>(`${SERVER_HOST}/case-studies?slug=${slug}`)
	}
} */
