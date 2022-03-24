import * as yup from 'yup';

export const documentIdSchema = yup.string().uuid();
