import type { StrictFalsyable } from '@repo/shared';

/* 
"class join"
Lighter weight alternative to clsx or cn
*/
export const cloin = (...classes: Array<StrictFalsyable<string>>): string =>
	classes.filter((maybeClass) => !!maybeClass).join(' ');
