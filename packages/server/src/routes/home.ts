import { HttpStatusCode } from '@lib/http-status-code';
import express = require('express');
import { HOST } from 'src/config/constants';
const homeRouter = express.Router();

homeRouter.get('/', (_, response) => {
	response.status(HttpStatusCode.OK).json({
		_links: {
			_self: {
				href: HOST,
				method: 'GET',
				rel: 'self'
			},
			'case studies': {
				href: `${HOST}/case-studies`,
				method: 'GET',
				rel: 'case studies'
			},
			'case study': {
				href: `${HOST}/case-studies/:id`,
				method: 'POST',
				rel: 'case studies',
				title: 'Get Case Study'
			},
			video: {
				href: `${HOST}/videos/:id`
			},
			videos: {
				href: `${HOST}/videos`
			}
		},
		message: "Welcome to Austin's API server. Play nice 😉."
	});
});

homeRouter.all('/', (_, response) => {
	response.status(HttpStatusCode.TEAPOT).json({ message: 'GET or GET OUT.' });
});

export { homeRouter };
