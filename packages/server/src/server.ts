// HATEOAS
import 'dotenv/config';
import express = require('express');
import { caseStudyRouter } from '@routes/case-studies';
import { rateLimiter } from '@middleware/rate-limiter';
import helmet from 'helmet';
import cors = require('cors');
import { jsonFromBody } from '@middleware/json-from-body';
import { HOST, PORT } from './config/constants';
import { homeRouter } from '@routes/home';

const app = express();

// TODO: refine before deployment
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// app.use(helmet());
// app.use(cors);
// app.use(bodyParser.json());
app.use(jsonFromBody);

// app.use(rateLimiter) // TODO: setup per-route https://github.com/nfriedly/express-rate-limit
app.disable('x-powered-by'); // NOTE: can remove if using helmet

/* 
ROUTES
*/
app.use(homeRouter);
app.use(caseStudyRouter);

app.listen(PORT, () => {
    console.log('server ready on port:', HOST);
});
