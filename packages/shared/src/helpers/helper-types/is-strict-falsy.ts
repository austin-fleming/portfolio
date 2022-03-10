import { isFalse, isNothing } from '.';

export type StrictFalsy = null | undefined | false;
export type StrictFalsyable<T> = StrictFalsy | T;

export const isStrictFalsy = (value: unknown): value is StrictFalsy =>
	isNothing(value) || isFalse(value);
