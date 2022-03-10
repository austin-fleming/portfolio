import express = require('express');
const caseStudyRouter = express.Router();
import { statusCodes } from '@lib/response-codes';
import { fetchCaseStudies, fetchCaseStudyById } from '@db/fetch-case-studies';
import type { Uuid } from '@db/types';
import { isMaybeUuid } from '@lib/validation/validate-uuid';
import { postCaseStudy } from '@db/post-case-studies';
import type { CaseStudyPostProperties, CaseStudy } from '@repo/db';

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

caseStudyRouter.get(ROUTE, async (request, response) => {
    const { data: caseStudies, error } = await fetchCaseStudies();

    if (error) {
        console.error(error);

        response.status(500).json({
            message: 'Internal Server Error. Data host returned an error.'
        });

        return;
    }

    if (!caseStudies || caseStudies.length === 0) {
        response.status(statusCodes.NOT_FOUND).json({
            message: 'Not Found. No case studies have been added... yet.'
        });

        return;
    }

    response.status(statusCodes.OK).json(caseStudies);
    /* response.status(statusCodes.OK).json({
        data: caseStudies,
        links: {
            'case studies by id': 'case-studies/:id'
        }
    }); */
});

caseStudyRouter.post(ROUTE, async (request, response) => {
    const demoData: CaseStudyPostProperties = {
        is_published: true,
        slug: 'gift-platform-3',
        title: 'Gift Platform-3',
        summary:
            'Guarding against the personal taste of a thousand politicians.',
        body: {
            content:
                'Abu Dhabi had a problem. Whenever a government representative needed to give a gift to a foreign representative, there were no guidelines in place. This lead to some gifts being exchanged that the leaders of the country felt were “unrepresentative of their national image”.'
        },
        feature_image: [
            {
                source: 'sample-source',
                alt: 'sample-alt'
            }
        ],
        feature_video: [
            {
                source: 'sample-source',
                title: 'a video',
                provider: 'youtube',
                details: {
                    width: 1920,
                    height: 1080
                }
            }
        ],
        completion_period: '2020',
        project_status: 'development',
        // This should probably be html or block content to allow links
        client: 'ADGMO via SLASH',
        tools: ['Figma'],
        categories: ['UI', 'UX'],
        note: "Styling and implementation for this project are currently under NDA, so I'm only presenting logic details until the official launch."
    };

    const { data, error } = await postCaseStudy(demoData);

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

    const { data: caseStudy, error } = await fetchCaseStudyById(id);

    if (error) {
        console.error(error);

        response.status(500).json({
            message: 'Internal Server Error. Data host returned an error.'
        });

        return;
    }

    if (!caseStudy || caseStudy.length === 0) {
        response.status(statusCodes.NOT_FOUND).json({
            message: 'Not Found. No case studies match the requested ID.'
        });

        return;
    }

    response.status(statusCodes.OK).json({
        data: caseStudy,
        ...(caseStudy.length > 1 && {
            message: 'More than one result found. Returning the first.'
        })
    });
});

caseStudyRouter.all(`${ROUTE}/:id`, (_, response) => {
    response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

export { caseStudyRouter };
