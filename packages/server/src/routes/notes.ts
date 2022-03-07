import express = require('express');
const noteRouter = express.Router();
import { statusCodes } from '@lib/response-codes';
import type { Uuid } from '@db/types';
import { isMaybeUuid } from '@lib/validation/validate-uuid';
import { fetchNoteById, fetchNotes } from '@db/fetch-notes';

/* 
TODO: remove this tester
*/

noteRouter.get('/notes', async (_, response) => {
    const { data: notes, error } = await fetchNotes();

    if (error) {
        console.error(error);

        response.status(500).json({
            message: 'Internal Server Error. Data host returned an error.'
        });

        return;
    }

    if (!notes || notes.length === 0) {
        response.status(statusCodes.NOT_FOUND).json({
            message: 'Not Found. No notes have been added... yet.'
        });

        return;
    }

    response.status(statusCodes.OK).json({
        data: notes,
        links: {
            'notes by id': 'notes/:id'
        }
    });
});

noteRouter.all('/notes', (_, response) => {
    response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

noteRouter.get('/notes/:id', async (request, response) => {
    const { id } = request.params;

    if (!isMaybeUuid(id)) {
        response.status(400).json({
            message: 'Bad Request. ID parameter must be a valid UUID.'
        });

        return;
    }

    const { data: note, error } = await fetchNoteById(id);

    if (error) {
        console.error(error);

        response.status(500).json({
            message: 'Internal Server Error. Data host returned an error.'
        });

        return;
    }

    if (!note || note.length === 0) {
        response.status(statusCodes.NOT_FOUND).json({
            message: 'Not Found. No notes match the requested ID.'
        });

        return;
    }

    response.status(statusCodes.OK).json({
        data: note,
        ...(note.length > 1 && {
            message: 'More than one result found. Returning the first.'
        })
    });
});

noteRouter.all('/notes/:id', (_, response) => {
    response.status(418).json({ message: 'Play nice... GET or GET OUT.' });
});

export { noteRouter };
