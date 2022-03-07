import { supabase } from './client';
import type { Note } from './types';

/* 
TODO: delete this tester
*/
const noteQuery = '*';

export const fetchNotes = async () =>
    supabase.from<Note>('note').select(noteQuery);

export const fetchNoteById = async (id: string) =>
    supabase.from<Note>('note').select(noteQuery).eq('id', id).single();
