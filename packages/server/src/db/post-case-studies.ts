import { supabase } from '@db/client';
import type { CaseStudy, CaseStudyPostProperties } from '@repo/db';
import type { PostgrestError, PostgrestResponse } from '@supabase/supabase-js';

/* 
TODO: Cleanup "ResponseShape" and centralize
*/

type MethodError = {
    status: number;
    error: string;
    message: string;
};

type Successful<T> = {
    data: T;
    error: null;
};

type Failure = {
    data: null;
    error: MethodError;
};

// type ResponseShape<T> = Successful<T> | Failure;

type ResponseShape<T> = {
    data: T | null;
    error: MethodError | null;
};

export const postCaseStudy = async (
    caseStudyData: CaseStudyPostProperties
): Promise<ResponseShape<CaseStudy[]>> => {
    const { data, error } = await supabase
        .from<CaseStudy>('case_study')
        .insert([caseStudyData]);

    // https://www.postgresql.org/docs/current/errcodes-appendix.html
    if (error) {
        console.error(error);

        /* 
          TODO: use this error shape ({ data, error }) everywhere to abstract out
          errors from whatever back end is being used. Router should trust that
          it will be handled a legible error from whatever happens here.
        */

        if (error.code === '23505')
            return {
                data,
                error: {
                    status: 409,
                    error: 'Conflict Error',
                    message: error.message
                }
            };

        if (error.code === '23502')
            return {
                data,
                error: {
                    status: 422,
                    error: 'Unprocessable Entity',
                    message: error.message
                }
            };

        return {
            data,
            error: {
                status: 500,
                error: 'Server Error',
                message: error.message
            }
        };
    }

    return { data, error };
};

/* 
TODO: this should return something more in line with:

  {data, error}

  where error has message and the proper http code translated from the postgres code.

  if 200, server just returns response.status(200).json(data)

  if error, server should response.status(<code>).json({
    timestamp: <timestamp>,
    status: <code>,
    error: <code name>,
    message: <message>,
    path: <this endpoint>
  })
*/
