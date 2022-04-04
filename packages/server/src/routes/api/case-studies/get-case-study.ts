import { getCaseStudies } from '@db/get-case-studies';
import { HttpStatusCode } from '@lib/http-status-code';
import express = require('express');

const router = express.Router();

const route = '/api/case-studies';

router.get(route, async (request, response, next) => {
	try {
		const { limit, offset } = request.query;

		const { data, error } = await getCaseStudies({ limit, offset });

		if (error) throw error;

		response.status(HttpStatusCode.OK).json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
