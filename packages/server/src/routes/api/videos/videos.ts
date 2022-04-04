import { getVideos } from '@db/get-videos';
import { getVideoById } from '@db/get-video-by-id';
import { HttpStatusCode } from '@lib/http-status-code';
import express = require('express');
import videosService from '@db/videos';

const router = express.Router();

router.get('/videos', async (_, response, next) => {
	try {
		console.log('GET /videos');
		const { data, error } = await videosService.get();

		if (error) throw error;

		response.status(HttpStatusCode.OK).json(data);
	} catch (error) {
		next(error);
	}
});

router.get('/videos/:id', async (request, response, next) => {
	const { id } = request.params;

	console.log(`GET /videos/:id {id: ${id}}`);

	try {
		const { data, error } = await videosService.getById(id);

		if (error) throw error;

		response.status(HttpStatusCode.OK).json(data);
	} catch (error) {
		next(error);
	}
});

// TODO: should this be moved into service instead of being done in-route?
const validateVideo = <T>(data: T): T => data;

router.put('/videos/:id', async (request, response, next) => {
	const { id } = request.params;
	const { body } = request;

	console.log(`PUT /videos/:id {id: ${id}}`);

	try {
		const validatedData = validateVideo(body); // TODO

		// TODO: maybe throw in services to avoid having to wrap everywhere
		const { data, error } = await videosService.put(validatedData);

		if (error) throw error;

		response.status(HttpStatusCode.NO_CONTENT).json(data);
	} catch (error) {
		next(error);
	}
});

router.post('/videos/:id', async (request, response, next) => {
	const { id } = request.params;
	const { body } = request;

	console.log(`POST /videos/:id {id: ${id}}`);

	try {
		console.log('POST body:', body);
		const validatedData = validateVideo(body); // TODO

		const { data, error } = await videosService.post(validatedData);

		console.log('ERROR:', error);
		if (error) throw error;

		if (!data) {
			console.error('No data returned for POST.');
		}

		response.status(HttpStatusCode.RESOURCE_CREATED).json(data);
	} catch (error) {
		next(error);
	}
});

router.delete('/videos/:id', async (request, response, next) => {
	const { id } = request.params;

	try {
		console.log(`DELETE /videos/:id {id: ${id}}`);

		const { data, error } = await videosService.remove(id);

		if (error) throw error;

		response.status(HttpStatusCode.NO_CONTENT).json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
