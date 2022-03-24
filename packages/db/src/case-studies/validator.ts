import * as s from 'superstruct';
import { caseStudySchema, caseStudySubmissionSchema } from './schema';
import type { CaseStudySubmission, CaseStudy } from './schema';
import type { Nothing } from '@repo/shared';

const processSuperstructError = (error: s.StructError) => {
	const { key, value, type, refinement } = error;

	console.error('SUPERSTRUCT ERROR:\n', error, '\n');
	console.error('FAILURES:');

	for (const failure of error.failures()) {
		console.error('>', JSON.stringify(failure));
	}
	console.error('\n');

	if (refinement) {
		console.error('🎉 REFINEMENT ERROR 🎉');
		console.error(refinement);
	}

	if (value === undefined) {
		const builtError = new Error(`user_${key}_required`);
		console.error('>> value === undefined');
		console.error(builtError);
		return builtError;
	}

	if (type === 'never') {
		const builtError = new Error(`user_attribute_unknown`);
		console.error('>> type === never');
		console.error(key);
		console.error(builtError);
		return builtError;
	}

	const builtError = new Error(`user_${key}_invalid`);
	console.error('>> else condition');
	console.error(key);
	console.error(value);
	return builtError;
};

export const validateCaseStudy = (data: CaseStudy) =>
	s.validate(data, caseStudySchema, { coerce: true });

export const validateCaseStudySubmission = (
	data: CaseStudySubmission
): { data: CaseStudySubmission; error: Nothing } | { data: Nothing; error: Error } => {
	try {
		s.assert(data, caseStudySubmissionSchema);

		/* if (error) {
			throw processSuperstructError(error);
		} */

		return { data, error: undefined };
	} catch (error) {
		const processedError = processSuperstructError(error);
		return { data: undefined, error: processedError };
	}
};
