import type { Nullable } from './nullable';
import { isNothing } from './is-nothing';

export const isJust = <T>(nullable: Nullable<T>): nullable is T => !isNothing(nullable);
