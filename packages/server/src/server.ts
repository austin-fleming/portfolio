// HATEOAS
import 'dotenv/config';
import express = require('express');
import helmet from 'helmet';
import cors = require('cors');
import { jsonFromBody } from '@middleware/json-from-body';
import { HOST, PORT } from './config/constants';
import { errorLogger } from '@middleware/error-logger';
import { errorResponder } from '@middleware/error-responder';
import { errorFallback } from '@middleware/error-fallback';
import apiRouter from '@routes';

const app = express();

// TODO: refine before deployment
const corsOptions = {
	credentials: true,
	optionSuccessStatus: 200,
	origin: '*'
};
app.use(cors(corsOptions));

// app.use(helmet());
// app.use(cors);
// app.use(bodyParser.json());
// app.use(jsonFromBody);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable('x-powered-by'); // NOTE: can remove if using helmet

/* 
ROUTES
*/
app.use(apiRouter);

/* 
ERROR HANDLING
*/
app.use(errorLogger);
app.use(errorResponder);
app.use(errorFallback);

app.listen(PORT, () => {
	console.log(`Starting server in ${app.settings.env} mode.`);
	console.log('server ready on port:', HOST);
});
