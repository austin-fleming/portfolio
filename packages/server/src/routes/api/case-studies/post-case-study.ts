import express = require('express');
import { HttpStatusCode } from '@lib/http-status-code';
import { postCaseStudy } from '@db/post-case-studies';
import { validateCaseStudySubmission } from '@repo/db/src/case-studies';
import type { CaseStudySubmission } from '@repo/db/src/case-studies';

const router = express.Router();

const route = '/api/case-studies';

const sample: CaseStudySubmission = {
	author: '12f1ba85-4d5d-449a-a2cb-f8decb7ac8eb',
	body: {
		content: 'test'
	},
	//date_modified: null,
	//date_published: null,
	//details: null,
	feature_image: {
		alt: 'test',
		height: 200,
		source: 'https://example.com',
		width: 10
	},
	feature_video: 'cbcf5cb0-9ecb-40c6-971f-79fd2b645bb8',
	is_published: true,
	//note: null,
	slug: 'hello',
	subtitle: 'multidisciplinary',
	summary: 'A summary of a test article.',
	title: 'Test Article'
};

export default router.post(route, async (request, response, next) => {
	try {
		const postData = request.body;

		console.log('### Request data:', postData);

		const { data: validatedData, error: validationError } = validateCaseStudySubmission(sample);
		if (validationError) throw validationError;

		const { data, error } = await postCaseStudy(validatedData);
		if (error) throw error;

		response.status(HttpStatusCode.RESOURCE_CREATED).json(data);
	} catch (error) {
		next(error);
	}
});
