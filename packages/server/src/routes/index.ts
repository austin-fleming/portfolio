import express = require('express');
import getCaseStudyRouter from './api/case-studies/get-case-study';
import postCaseStudy from './api/case-studies/post-case-study';
import loginRouter from './api/login';
import { homeRouter } from './home';
import { videosRouter } from './videos';

const router = express.Router();

router.use(homeRouter);
router.use(getCaseStudyRouter);
router.use(postCaseStudy);
router.use('/videos', videosRouter);
router.use(loginRouter);

export default router;
