import { timestamptz, uuidV4 } from 'src/fragments';
import * as s from 'superstruct';

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
export const videoSchema = s.object({
	id: uuidV4,
	_created_at: timestamptz,
	_updated_at: timestamptz,
	title: s.size(s.string(), 3, 150),
	description: s.string(),
	caption: s.optional(s.string()),
	attribution: s.optional(s.string()),
	status: s.enums(['pending', 'ready', 'cancelled']),
	provider: s.defaulted(s.enums(['mux']), 'mux'),
	asset_data: s.dynamic<Record<string, unknown> | undefined>((value, context) =>
		context.branch.status === 'ready' ? s.type({}) : s.optional(s.type({}))
	)
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export type Video = s.Infer<typeof videoSchema>;

export const videoSubmissionSchema = s.omit(videoSchema, ['id', '_updated_at', '_created_at']);
export type VideoSubmission = s.Infer<typeof videoSubmissionSchema>;
