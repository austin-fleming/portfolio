import { statusCodes } from '@lib/response-codes';
import express = require('express');
import { HOST } from 'src/config/constants';
const homeRouter = express.Router();

homeRouter.get('/', (_, response) => {
    response.status(statusCodes.OK).json({
        message: "Welcome to Austin's API server. Play nice 😉.",
        links: {
            href: HOST,
            'case studies': `${HOST}/case-studies`
        }
    });
});

homeRouter.all('/', (_, response) => {
    response.status(statusCodes.TEAPOT).json({ message: 'GET or GET OUT.' });
});

export { homeRouter };
