import * as yup from 'yup';

// TODO: make safe
/* eslint-disable-next-line unicorn/no-unsafe-regex */
const slugRegex = /^[\da-z]+(?:-[\da-z]+)*$/;

export const slugSchema = yup.string().matches(slugRegex, 'Must be in "first-second" format.');
