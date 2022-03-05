import express = require('express');
const caseStudyRouter = express.Router();
import { statusCodes } from '@lib/response-codes';
import { fetchCaseStudies } from '@db/fetch-case-studies';

caseStudyRouter.get('/case-studies', async (request, response) => {
    const { data: caseStudies, error } = await fetchCaseStudies();

    if (error) {
        console.error(error);

        response.status(500).json({
            message: 'Internal Server Error. Data host returned an error.'
        });
        return;
    }

    if (!caseStudies) {
        response
            .status(statusCodes.NOT_FOUND)
            .json({ message: 'Nothing here.' });
        return;
    }

    if (caseStudies.length === 0) {
        response
            .status(statusCodes.NO_CONTENT)
            .json({ message: 'No case studies have been added ...yet.' });
        return;
    }

    response.status(statusCodes.OK).json({ data: caseStudies });
});

caseStudyRouter.all('/case-studies', (_, response) => {
    response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

export { caseStudyRouter };
