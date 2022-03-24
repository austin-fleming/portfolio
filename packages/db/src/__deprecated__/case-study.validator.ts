/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix, unicorn/no-thenable */
import * as yup from 'yup';
import { documentIdSchema, slugSchema, timestamptzSchema } from 'src/fragments';
import type { Author } from 'src/author';
import type { Video } from 'src/video';
import type { ChangeTypeOfKeys, Nothing } from '@repo/shared';

const caseStudySchema = yup
	.object({
		id: documentIdSchema.required(),
		_created_at: timestamptzSchema.required().label('created at'),
		_updated_at: timestamptzSchema.required().label('updated at'),
		date_published: timestamptzSchema
			.nullable(true)
			.when('is_published', {
				is: true,
				then: yup.date().nullable(true).required(),
				otherwise: yup.date().nullable(true).notRequired()
			})
			.label('date published'),
		date_modified: timestamptzSchema.nullable(true).notRequired().label('date modified'),
		is_published: yup.boolean().required().label('is published'),
		// TODO: may want to test via fetch that slug is unique.
		slug: slugSchema.required(),
		// TODO: may want to test via fetch that author exists.
		author: yup.string().uuid().nullable(true),
		// TODO: may want to test via fetch that title is unique.
		title: yup.string().max(150, 'Must be 150 characters or less.').required(),
		subtitle: yup.string().required(),
		summary: yup.string().required(),
		details: yup
			.array()
			.of(
				yup.object({
					title: yup.string().required(),
					body: yup.string().required()
				})
			)
			.nullable(true),
		note: yup
			.object({
				title: yup.string().required('required'),
				body: yup.string().required()
			})
			.nullable(true),
		feature_image: yup
			.object({
				source: yup.string().url().required(),
				alt: yup.string().required(),
				width: yup
					.number()
					.integer('Must be an integer.')
					.positive('Must be a positive integer.')
					.required(),
				height: yup
					.number()
					.integer('Must be an integer.')
					.positive('Must be a positive integer.')
					.required(),
				caption: yup.string().nullable(true),
				attribution: yup.string().nullable(true)
			})
			.required()
			.noUnknown(true)
			.strict(true)
			.label('feature image'),
		// TODO: may want to do test via fetch to assert video exists
		feature_video: yup.string().uuid().nullable(true).label('feature video'),
		body: yup.object().required()
	})
	.noUnknown(true)
	.strict(true);

type ReturnValue<T> =
	| {
			data: T;
			error: Nothing;
	  }
	| {
			data: Nothing;
			error: Error;
	  };

const validateSchema = async <SchemaType, DataType>(
	schema: SchemaType,
	data: DataType
): Promise<ReturnValue<DataType>> => {
	try {
		const maybeData = await schema.validate(data);

		return { data: maybeData, error: undefined };
	} catch (error) {
		if (error instanceof yup.ValidationError) {
			console.error('~~~~~');
			console.error('~~Yup Errors~~');
			console.error('~~Inner:', JSON.stringify(error.inner));
			console.error('~~Errors:', error.errors);
			console.error('~~Path:', error.path);
			console.error('~~');
			console.error({ error });
			console.error('~~~~~');

			const reduceWithNewlines = (stringArray: string[]): string =>
				/* eslint-disable-next-line unicorn/no-array-reduce */
				stringArray.reduce((previous, current) => `${previous}\n${current}`, '');

			/* const errorList = error.inner

      const errorDescriptions = error.inner.reduce((previous, current) => {
        current.
      })
 */

			const errorDetails = error.message + '.\n' + reduceWithNewlines(error.errors);

			console.error('%%%%%\n\n');
			for (const current of error.inner) {
				console.error(JSON.stringify(current));
			}
			console.error('\n\n%%%%%');

			return {
				data: undefined,
				error: new ApiError('BAD_REQUEST', 'One or more fields failed validation.', errorDetails)
			};
		}

		return {
			data: undefined,
			error: new ApiError(
				'INTERNAL_SERVER_ERROR',
				'Unknown issue',
				'We ran into a problem while validating your data.',
				false
			)
		};
	}
};

export type CaseStudy = yup.InferType<typeof caseStudySchema>;
export const validateCaseStudy = async (data: CaseStudy) =>
	caseStudySchema.validate(data, { abortEarly: false });

const caseStudySubmissionSchema = caseStudySchema.omit(['id', '_created_at', '_updated_at']);
export type CaseStudySubmission = yup.InferType<typeof caseStudySubmissionSchema>;
export const validateCaseStudySubmission = async (data: CaseStudySubmission) =>
	caseStudySubmissionSchema.validate(data, { abortEarly: false, strict: true });

export type ExpandedCaseStudy = Omit<CaseStudy, 'author' | 'feature_video'> & {
	author?: Author;
	feature_video?: Video;
};
