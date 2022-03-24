import express = require('express');
import type { Asset, CreateUploadParams, ListAssetParams } from '@mux/mux-node/dist/video/domain';
import { ApiError } from '@lib/error-handling/api-error';
import { HttpStatusCode } from '@lib/http-status-code';
import { muxClient } from '@db/mux-client';
import * as yup from 'yup';
import { supabase } from '@db/client';

const videosRouter = express.Router();

videosRouter.get('/', async (_, response, next) => {
	try {
		const listParameters: ListAssetParams = {
			limit: 10,
			page: 0
		};
		const assets = await muxClient.Video.Assets.list(listParameters);

		if (!assets) {
			next(
				new ApiError(
					'BAD_GATEWAY',
					'Could not connect to video host',
					"It's possible our video host is down or is busy."
				)
			);
		}

		response.status(HttpStatusCode.OK).json(assets);
	} catch {
		next(
			new ApiError(
				'INTERNAL_SERVER_ERROR',
				'Unexpected error',
				'An issue appeared when trying to contact our video host.'
			)
		);
	}
});

videosRouter.get('/:id', async (request, response, next) => {
	try {
		const { id } = request.params;

		const asset = await muxClient.Video.Assets.get(id);

		if (!asset) {
			next(
				new ApiError(
					'BAD_GATEWAY',
					'Could not connect to video host',
					"It's possible our video host is down or is busy."
				)
			);
		}

		response.status(HttpStatusCode.OK).json(asset);
	} catch (error) {
		console.error('Unexpected error.', error);

		// ESNOTE: Mux doesn't provide an easy interface to detect errors from their SDK
		/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
		if ((error as any)?.type === 'invalid_parameters') {
			next(
				new ApiError('BAD_REQUEST', 'Unknown asset id', "The id provided doesn't match any asset.")
			);
		}

		next(
			new ApiError(
				'INTERNAL_SERVER_ERROR',
				'Unexpected error',
				'An issue appeared when trying to contact our video host.'
			)
		);
	}
});

/* 
TODO:
Frontend form needs to capture metadata and send in request such as:
  {
    Title
    Caption
    Attribution
  }

Route needs to:
  1. upload video
  2. get metadata from video such as:
    {
      length,
      size,
      video url for playback
    }
  3. join together data from Mux with frontend metadata
  4. write it to supabase
  5. respond with supabase entry
*/
type VideoFormData = {
	attribution?: string;
	caption?: string;
	tags?: Array<string>;
	title: string;
};

// TODO: also needs to write metadata to a supabase table.
videosRouter.get('/upload', async (_, response, next) => {
	try {
		const uploadParameters: CreateUploadParams = {
			//TODO: update this to the frontend addresses. Use a config file with .dotenv to simplify this.
			cors_origin: '*',
			// TODO: verify that I want this. May want the video request to be credentialed.
			new_asset_settings: { playback_policy: 'public' }
		};
		const { id, url } = await muxClient.Video.Uploads.create(uploadParameters);

		if (!id || !url) {
			next(
				new ApiError(
					'BAD_GATEWAY',
					'Could not connect to video host',
					"It's possible our video host is down or is busy."
				)
			);
		}

		response.status(HttpStatusCode.OK).json({ id, url });
	} catch {
		next(
			new ApiError(
				'INTERNAL_SERVER_ERROR',
				'Unexpected error',
				'An issue appeared when trying to contact our video host.'
			)
		);
	}
});

videosRouter.post('/upload', async (request, response, next) => {
	try {
		/* 
		STEP 01:
		Get parameters
		*/
		const { title, description, caption, attribution } = request.body;

		const body = {
			attribution,
			caption,
			description,
			provider: 'mux',
			status: 'pending',
			title
		};

		const validatedBody = await yup
			.object({
				caption: yup.string(),
				description: yup.string().required(),
				provider: yup.string().matches(/(mux)/),
				status: yup.string().matches(/(pending|ready|cancelled)/),
				summary: yup.string(),
				title: yup.string().max(150).required()
			})
			.validate(body)
			.catch((error) => {
				console.error(error);
				next(
					new ApiError(
						'BAD_REQUEST',
						'One or more parameters are either missing or incorrect.',
						error.message
					)
				);
			});

		console.error('CHECK:', validatedBody);

		/* 
		STEP 02:
		Get id and url from Mux
		*/
		const uploadParameters: CreateUploadParams = {
			//TODO: update this to the frontend addresses. Use a config file with .dotenv to simplify this.
			cors_origin: '*',
			// TODO: verify that I want this. May want the video request to be credentialed.
			new_asset_settings: { playback_policy: 'public' }
		};
		const { id, url } = await muxClient.Video.Uploads.create(uploadParameters);

		console.log('ID AND URL:', id, url);

		if (!id || !url) {
			next(
				new ApiError(
					'BAD_GATEWAY',
					'Could not connect to video host',
					"It's possible our video host is down or is busy."
				)
			);
		}

		const { data, error } = await supabase.from('video').insert([
			{
				...body,
				asset_data: {
					id,
					url
				}
			}
		]);

		response.status(HttpStatusCode.RESOURCE_CREATED).json({ id, url });

		/* 
		STEP 03:
		Write to database
		*/
	} catch {}
});

videosRouter.post('/upload/:id', async (request, response, next) => {
	try {
		const { id } = request.params;
	} catch {
		next(
			new ApiError(
				'INTERNAL_SERVER_ERROR',
				'Unexpected error',
				'An issue appeared when trying to contact our video host.'
			)
		);
	}
});

export { videosRouter };
