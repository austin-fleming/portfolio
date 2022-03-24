/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix, unicorn/no-thenable */
import * as yup from 'yup';
import { documentIdSchema, imageSchema, slugSchema, timestamptzSchema } from 'src/fragments';

const authorSchema = yup.object({
	id: documentIdSchema.required('Required.'),
	_created_at: timestamptzSchema.required('Required.'),
	_updated_at: timestamptzSchema.required('Required.'),
	name: yup.string().required('Required.'),
	slug: slugSchema.required('Required.'),
	is_active: yup.boolean().default(false).required('Required.'),
	blurb: yup.string().required('Required.'),
	avatar: imageSchema.required('Required.'),
	personal_site: yup.string().url().nullable(),
	social_sites: yup.array().of(yup.string().url()).nullable()
});

export type Author = yup.InferType<typeof authorSchema>;
export const validateAuthor = async (data: Author) => authorSchema.validate(data);

const authorSubmissionSchema = authorSchema.omit(['id', '_created_at', '_updated_at']);
export type AuthorSubmission = yup.InferType<typeof authorSubmissionSchema>;
export const validateAuthorSubmission = async (data: AuthorSubmission) =>
	authorSubmissionSchema.validate(data);
