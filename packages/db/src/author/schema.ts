import { slug, timestamptz, uuidV4, imageData, url } from 'src/fragments';
import * as s from 'superstruct';

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
export const authorSchema = s.object({
	id: uuidV4,
	_created_at: timestamptz,
	_updated_at: timestamptz,
	name: s.string(),
	slug: slug,
	is_active: s.defaulted(s.boolean(), false),
	blurb: s.string(),
	avatar: imageData,
	personal_site: s.nullable(url),
	social_sites: s.nullable(s.array(url))
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export type Author = s.Infer<typeof authorSchema>;

export const authorSubmissionSchema = s.omit(authorSchema, ['id', '_created_at', '_updated_at']);
export type AuthorSubmission = s.Infer<typeof authorSubmissionSchema>;
