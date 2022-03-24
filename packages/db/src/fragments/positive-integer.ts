import * as s from 'superstruct';

export const positiveInteger = s.min(s.integer(), 0, { exclusive: true });
