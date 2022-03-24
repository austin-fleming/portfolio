import * as s from 'superstruct';

// TODO: abstract and move to shared

// TODO: make safe
/* eslint-disable-next-line unicorn/no-unsafe-regex */
const slugRegex = /^[\da-z]+(?:-[\da-z]+)*$/;

export const slug = s.pattern(s.string(), slugRegex);
