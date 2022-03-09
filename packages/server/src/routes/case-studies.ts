import express = require('express');
const caseStudyRouter = express.Router();
import { statusCodes } from '@lib/response-codes';
import { fetchCaseStudies, fetchCaseStudyById } from '@db/fetch-case-studies';
import type { Uuid } from '@db/types';
import { isMaybeUuid } from '@lib/validation/validate-uuid';

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

caseStudyRouter.get('/case-studies', async (request, response) => {
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

caseStudyRouter.all('/case-studies', (_, response) => {
    response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

caseStudyRouter.get('/case-studies/:id', async (request, response) => {
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

caseStudyRouter.all('/case-studies/:id', (_, response) => {
    response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

export { caseStudyRouter };
