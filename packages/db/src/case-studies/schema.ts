import { authorSchema } from 'src/author';
import { uuidV4, timestamptz, slug, url, positiveInteger, imageData } from 'src/fragments';
import { videoSchema } from 'src/video';
import * as s from 'superstruct';

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
const baseSchema = s.object({
	id: uuidV4,
	_created_at: timestamptz,
	_updated_at: timestamptz,
	is_published: s.defaulted(s.optional(s.boolean()), false),
	/* date_published: s.dynamic((value, parent) => {
		// NOTE: if published, date_published must be set.
		console.log('>> PARENT:', parent);
		console.log('>> PATH:', parent.path);
		console.log('>> BRANCH:', parent.branch);
		console.log('>> CONTEXT:', JSON.stringify(parent));
		console.log('>> VALUE', value);
		console.log('>> is_published:', value.is_published);

		return caseStudySchema.is_published === true ? s.optional(timestamptz) : timestamptz;
	}), */
	date_published: s.optional(timestamptz),
	date_modified: s.optional(timestamptz),
	slug: slug,
	author: s.optional(uuidV4),
	title: s.size(s.string(), 3, 150),
	subtitle: s.string(),
	summary: s.string(),
	details: s.optional(
		s.array(
			s.object({
				title: s.string(),
				body: s.string()
			})
		)
	),
	note: s.optional(
		s.object({
			title: s.string(),
			body: s.string()
		})
	),
	feature_image: imageData,
	feature_video: s.optional(uuidV4),
	body: s.type({})
});
export const caseStudySchema = s.refine(baseSchema, 'HasDatePublishedIfIsPublished', (schema) => {
	console.log('SCHEMA:', schema);
	const result = !(!!schema.is_published && !schema.date_published);
	console.log('RESULT:', result);
	return result;
});

export type CaseStudy = s.Infer<typeof caseStudySchema>;

export const caseStudySubmissionSchema = s.omit(caseStudySchema, [
	'id',
	'_created_at',
	'_updated_at'
]);
export type CaseStudySubmission = s.Infer<typeof caseStudySubmissionSchema>;

const caseStudyExpandedSchema = s.assign(
	caseStudySchema,
	s.object({ author: s.optional(authorSchema), feature_video: s.optional(videoSchema) })
);
type CaseStudyExpanded = s.Infer<typeof caseStudyExpandedSchema>;
