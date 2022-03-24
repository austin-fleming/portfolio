import * as yup from 'yup';

export const imageSchema = yup.object({
	alt: yup.string().required('Required.'),
	attribution: yup.string().nullable(),
	caption: yup.string().nullable(),
	height: yup
		.number()
		.integer('Must be an integer.')
		.positive('Must be a positive integer.')
		.required('Required.'),
	source: yup.string().url().required('Required.'),
	width: yup
		.number()
		.integer('Must be an integer.')
		.positive('Must be a positive integer.')
		.required('Required.')
});

export type Image = yup.InferType<typeof schema>;
