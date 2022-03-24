import express = require('express');
import type { NextFunction } from 'express';
const caseStudyRouter = express.Router();
import { HttpStatusCode } from '@lib/http-status-code';
import { getCaseStudies, getCaseStudyById } from '@db/get-case-studies';
import type { Uuid, CaseStudyPostProperties, CaseStudy } from '@db/models';
import { isMaybeUuid } from '@lib/validation/validate-uuid';
import { postCaseStudy } from '@db/post-case-studies';
import { forceToString, Nullable, parseIntegerFloored } from '@repo/shared';

/* 
    should version this. i.e.: /v1/case-studies
*/

/* 
    get:    get-info; safe, idempotent 
    post:   create new item
    put:    update existing item. Updates the ENTIRE item. More like "replace" without changing row id.
    patch:  update part of an item.


*/

/* 
    /case-studies
    /case-studies?order=""&limit=""&offset=""
        params:
            order:  (date) 'date'
            tag:    string
            limit:  (10) number
            offset: (0) number


    /case-studies/:id
*/

/* 
    error: {
        message:    string,
        type:       errorType,
        code:       errorNumber
    }

*/
const ROUTE = '/case-studies';

const getCaseStudies = async (request: Request, response: Response, next: NextFunction) => {
	const { limit, offset, slug } = request.query;

	const parsedLimit = parseIntegerFloored(limit);
	const parsedOffset = parseIntegerFloored(offset);
	const parsedSlug = slug && forceToString(slug);

	const { data, error } = await getCaseStudies({
		limit: parsedLimit,
		offset: parsedOffset,
		slug: parsedSlug
	});

	if (error) {
		console.error(error);

		response.status(500).json({
			message: 'Internal Server Error. Data host returned an error.'
		});

		return;
	}

	if (!data || data.length === 0) {
		response.status(HttpStatusCode.NOT_FOUND).json({
			message: 'Not Found. No case studies have been added... yet.'
		});

		return;
	}

	if (error) {
		// TODO: centralize and use response type in post route file to resolve this.
		response.status(error.status).json(error);
	}

	response.status(HttpStatusCode.OK).json(data);
};

caseStudyRouter.get(ROUTE, getCaseStudies);

caseStudyRouter.post(ROUTE, async (request, response) => {
	const mockData: CaseStudyPostProperties = {
		body: {
			content:
				'Abu Dhabi had a problem. Whenever a government representative needed to give a gift to a foreign representative, there were no guidelines in place. This lead to some gifts being exchanged that the leaders of the country felt were “unrepresentative of their national image”.'
		},
		categories: ['UI', 'UX'],
		// This should probably be html or block content to allow links
		client: 'ADGMO via SLASH',
		completion_period: '2020',
		feature_image: [
			{
				alt: 'sample-alt',
				source: 'sample-source'
			}
		],
		feature_video: [
			{
				details: {
					height: 1080,
					width: 1920
				},
				provider: 'youtube',
				source: 'sample-source',
				title: 'a video'
			}
		],
		is_published: true,
		note: "Styling and implementation for this project are currently under NDA, so I'm only presenting logic details until the official launch.",
		project_status: 'development',
		slug: 'gift-platform-3',
		summary: 'Guarding against the personal taste of a thousand politicians.',
		title: 'Gift Platform-3',
		tools: ['Figma']
	};

	const { data, error } = await postCaseStudy(mockData);

	if (error) {
		response.status(error.status).json(error);
	}

	response.status(200).json(data);
});

caseStudyRouter.all(ROUTE, (_, response) => {
	response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

caseStudyRouter.get(`${ROUTE}/:id`, async (request, response) => {
	const { id } = request.params;

	if (!isMaybeUuid(id)) {
		response.status(400).json({
			message: 'Bad Request. ID parameter must be a valid UUID.'
		});

		return;
	}

	const { data: caseStudy, error } = await getCaseStudyById(id);

	if (error) {
		console.error(error);

		response.status(500).json({
			message: 'Internal Server Error. Data host returned an error.'
		});

		return;
	}

	if (!caseStudy) {
		response.status(HttpStatusCode.NOT_FOUND).json({
			message: 'Not Found. No case studies match the requested ID.'
		});

		return;
	}

	response.status(HttpStatusCode.OK).json({
		data: caseStudy
	});
});

caseStudyRouter.all(`${ROUTE}/:id`, (_, response) => {
	response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

export { caseStudyRouter };
