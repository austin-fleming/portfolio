/* TODO: derive type from yup schema which should (FOR NOW) manually reflect the SQL */
import { object } from 'yup';

export const validate = <T>(data: T) => data;
