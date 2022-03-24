import type { Nothing } from '@repo/shared';
import axios from 'axios';
import type { CaseStudy } from 'server/src/db/models';
import type { BaseError } from 'server/src/lib/error-handling/base-error';
import { SERVER_HOST } from '$lib/api/config';

type SuccessResponse = {
	data: CaseStudy;
	error: Nothing;
};
type ErrorResponse = {
	data: Nothing;
	error: BaseError;
};

type Response = SuccessResponse | ErrorResponse;

export const postCaseStudy = async (data: CaseStudy): Promise<Response> => {
	try {
		const endpoint = `${SERVER_HOST}/case-studies`;

		const serverResponse = await axios.post(endpoint, data);

		console.log(serverResponse);

		return { data: serverResponse.data, error: undefined };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				const { data, status, headers } = error.response;
				console.log('~~RESPONSE ERROR~~');
				console.log({ data, headers, status });

				return { data: undefined, error: error.response };
			}

			if (error.request) {
				console.log('~~REQUEST ERROR~~');
				console.log(error.request);

				return { data: undefined, error: error.request };
			}
		}

		console.error('Error', 'A non-axios related error occured:', error);
		return { data: undefined, error: error };
	}
};
