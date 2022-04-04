// import { timestamptz, uuidV4 } from 'src/fragments';
import type { Asset as MuxAsset } from '@mux/mux-node/dist/video/domain';
import { buildYupValidationError } from 'src/lib/validation/build-yup-validation-error';
import * as y from 'yup';

// TODO: strictly enforce v4
const uuidV4 = y.string().uuid();

// TODO: strengthen this check
const timestamptz = y.string();

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix, unicorn/no-thenable */
export const videoSchema = y
	.object({
		/* eslint-disable-next-line unicorn/no-useless-undefined */
		id: uuidV4.required(),
		is_published: y.boolean().default(false),
		is_draft_of: uuidV4.optional(),
		_created_at: timestamptz.required(),
		_updated_at: timestamptz.required(),
		// TODO: fetch to assert uniqueness when submitted
		// Uniqueness should only be required when published to allow for drafts.
		title: y
			.string()
			.min(3, 'Minimum of (3) characters required.')
			.max(150, 'Maximum of (150) characters.')
			.when('is_published', ([is_published], thisSchema) =>
				is_published ? thisSchema.required() : thisSchema.notRequired()
			),
		description: y
			.string()
			.when('is_published', ([is_published], thisSchema) =>
				is_published ? thisSchema.required() : thisSchema.notRequired()
			),
		caption: y.string(),
		attribution: y.string(),
		status: y
			.string()
			.oneOf(['ready', 'pending', 'cancelled'])
			.when('is_published', ([is_published], thisSchema) =>
				is_published ? thisSchema.oneOf(['ready']).required() : thisSchema.notRequired()
			),
		provider: y
			.string()
			.oneOf(['mux'])
			.when('is_published', ([is_published], thisSchema) =>
				is_published ? thisSchema.required() : thisSchema.notRequired()
			),
		asset_data: y
			.object()
			.when('is_published', ([is_published], thisSchema) =>
				is_published ? thisSchema.required() : thisSchema.notRequired()
			)
	})
	.noUnknown(true);
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix, unicorn/no-thenable */

// TODO: currently types aren't very clean.
export type Video = y.InferType<typeof videoSchema>;
export const validateVideo = async (data: Video) => videoSchema.validate(data);

type SuccessReturn<T> = { data: T; error: undefined };

type ErrorReturn = { data: undefined; error: Error };

type ReturnType<T> = SuccessReturn<T> | ErrorReturn;

const validateVideoSchema = async (data: Video): Promise<ReturnType<Video>> => {
	try {
		const maybeData = await videoSchema.validate(data);

		return { data: maybeData, error: undefined };
	} catch (error) {
		return {
			data: undefined,
			error: buildYupValidationError(error)
		};
	}
};
