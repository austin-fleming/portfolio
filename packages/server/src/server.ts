// HATEOAS
import 'dotenv/config';
import express = require('express');
import config from './config/config';
import { caseStudyRouter } from '@routes/case-studies';
import { rateLimiter } from '@middleware/rate-limiter';
import helmet from 'helmet';
import cors = require('cors');
// import bodyParser = require('body-parser');
import { jsonFromBody } from '@middleware/json-from-body';

const app = express();

// app.use(helmet());
// app.use(cors);
// app.use(bodyParser.json());
app.use(jsonFromBody);

// app.use(rateLimiter) // TODO: setup per-route https://github.com/nfriedly/express-rate-limit
app.disable('x-powered-by'); // NOTE: can remove if using helmet

/* 
ROUTES
*/
const CURRENT_HOST = 'http://localhost:431';
app.get('/', (request, response) => {
    response.status(200);
    response.json({
        links: {
            href: CURRENT_HOST,
            'case-studies': `${CURRENT_HOST}/case-studies`
        }
    });
});

app.get('/hello-world', (request, response) => {
    response.status(200);
    response.json({ message: 'Hello World!', links: {} });
});

app.use(caseStudyRouter);

app.listen(config.port, () => {
    console.log('server ready on port:', config.port);
});
