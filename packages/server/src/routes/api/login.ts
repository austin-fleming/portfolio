import express = require('express');

const router = express.Router();

router.post('/api/login', async (request, response, next) => {
	console.log('LOGIN:');
	console.log(request.body.email);
	console.log(request.body.password);
});

export default router;
