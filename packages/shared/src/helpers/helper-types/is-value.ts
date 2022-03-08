export const isFalse = (value: unknown): value is false => value === false;

export const isTrue = (value: unknown): value is true => value === true;

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined => value === undefined;
