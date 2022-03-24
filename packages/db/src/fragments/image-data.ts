import * as s from 'superstruct';
import { url, positiveInteger } from 'src/fragments';

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
export const imageData = s.object({
	source: url,
	alt: s.string(),
	width: positiveInteger,
	height: positiveInteger,
	caption: s.optional(s.string()),
	attribution: s.optional(s.string())
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

export type ImageData = s.Infer<typeof imageData>;
