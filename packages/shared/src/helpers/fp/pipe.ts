/* eslint-disable unicorn/prevent-abbreviations, unicorn/no-array-reduce */

// Adapted from: https://github.com/biggyspender/ts-functional-pipe/blob/master/src/pipe.ts

// ESNOTE: Explicit 'any' is bad practice, but is the only way I've found to get pipe working in TS.
// Other methods didn't play well if the type of inputs are different from the output.
// This typing strategy properly resolves type changes mid-pipe. I've aliased 'any' to 'Any' to allow
// easily tracking the usage of 'any'.
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Any = any;

type Fn<Tin extends Any[], Tout> = (...args: Tin) => Tout;

type UnaryFn<Tin, Tout> = Fn<[Tin], Tout>;

const pipeImplementation = <A extends Any[], B>(
	...operations: [firstOperation: Fn<A, Any>, ...otherOperations: UnaryFn<Any, Any>[]]
): Fn<A, B> => {
	const [firstOperation, ...otherOperations] = operations;
	return (...args: A) =>
		otherOperations.reduce((acc, operation) => operation(acc), firstOperation(...args));
};

/**
 * Currently capped at 10 items. I'm not masochistic enough to go further.
 */
export function pipe<TIn extends Any[], TOut>(f0: Fn<TIn, TOut>): Fn<TIn, TOut>;
// 2
export function pipe<TIn extends Any[], T2, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, TOut>
): Fn<TIn, TOut>;
// 3
export function pipe<TIn extends Any[], T2, T3, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, TOut>
): Fn<TIn, TOut>;
// 4
export function pipe<TIn extends Any[], T2, T3, T4, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, TOut>
): Fn<TIn, TOut>;
// 5
export function pipe<TIn extends Any[], T2, T3, T4, T5, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, TOut>
): Fn<TIn, TOut>;
// 6
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, TOut>
): Fn<TIn, TOut>;
// 7
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, TOut>
): Fn<TIn, TOut>;
// 8
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, T8, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, T8>,
	f8: UnaryFn<T8, TOut>
): Fn<TIn, TOut>;
// 9
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, T8, T9, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, T8>,
	f8: UnaryFn<T8, T9>,
	f9: UnaryFn<T9, TOut>
): Fn<TIn, TOut>;
// 10
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, T8, T9, T10, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, T8>,
	f8: UnaryFn<T8, T9>,
	f9: UnaryFn<T9, T10>,
	f10: UnaryFn<T10, TOut>
): Fn<TIn, TOut>;
export function pipe<TIn extends Any[], TOut>(
	firstOperation: Fn<TIn, Any>,
	...operations: UnaryFn<Any, Any>[]
): Fn<TIn, TOut> {
	return pipeImplementation(firstOperation, ...operations);
}
