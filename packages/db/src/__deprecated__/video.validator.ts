/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix, unicorn/no-thenable */
import type { Asset as MuxAsset } from '@mux/mux-node/dist/video/domain';
import { documentIdSchema, timestamptzSchema } from 'src/fragments';
import * as yup from 'yup';

const videoSchema = yup.object({
	id: documentIdSchema.required('Required.'),
	_created_at: timestamptzSchema.required('Required.'),
	_updated_at: timestamptzSchema.required('Required.'),
	title: yup.string().max(150, 'Max 150 characters.').required('Required.'),
	description: yup.string().required('Required.'),
	caption: yup.string().nullable(),
	attribution: yup.string().nullable(),
	status: yup
		.string()
		.matches(/(pending|ready|cancelled)/)
		.required('Required.'),
	provider: yup.string().matches(/(mux)/).default('mux').required('Required.'),
	asset_data: yup
		.object()
		.nullable()
		.when('status', {
			is: 'ready',
			then: yup.object().nullable().required('Required when status is set to "ready".'),
			otherwise: yup.object().nullable().notRequired()
		})
});

// NOTE: Injecting mux asset type here so I still get typechecking.
// Object is created by mux, so I'm keeping the schema vague so changes to Mux's API doesn't cause validation errors.
export type Video = Omit<yup.InferType<typeof videoSchema>, 'asset_data'> & {
	asset_data?: MuxAsset;
};
export const validateVideo = async (data: Video) => videoSchema.validate(data);

const videoSubmissionSchema = videoSchema.omit(['id', '_created_at', '_updated_at']);
export type VideoSubmission = yup.InferType<typeof videoSubmissionSchema>;
export const validateVideoSubmission = async (data: VideoSubmission) =>
	videoSubmissionSchema.validate(data);
