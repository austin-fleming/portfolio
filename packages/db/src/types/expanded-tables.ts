import type { ChangeTypeOfKeys } from '@repo/shared';
import type { CaseStudy, Author } from '.';

export type ExpandedCaseStudy = ChangeTypeOfKeys<CaseStudy, 'author', Author>;
