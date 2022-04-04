import { getAxiosError } from '$lib/error-handling/get-axios-error';
import type { CaseStudy } from '@repo/db';
import type { Nullable } from '@repo/shared';
import axios from 'axios';
import { API_HOST } from './config';

const getAll = async (): Promise<Nullable<CaseStudy[]>> => {
	const queryUrl = `${API_HOST}/case-studies`;

	try {
		const { data } = await axios.get<CaseStudy[]>(queryUrl);

		if (!data) throw new Error('No data returned from server.');

		return data;
	} catch (error) {
		console.error(
			getAxiosError(error) || new Error(`Something went wrong: ${JSON.stringify(error)}`)
		);

		return;
	}
};

export const caseStudyService = {
	getAll
};
