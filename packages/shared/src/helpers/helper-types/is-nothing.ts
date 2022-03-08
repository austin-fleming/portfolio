import type { Nullable } from './nullable';

export type Nothing = null | undefined;

export const isNothing = <T>(nullable: Nullable<T>): nullable is Nothing =>
	nullable === null || nullable === undefined;
