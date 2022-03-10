/* 
	From: https://github.com/sibiraj-s/svelte-tiptap/blob/master/src/lib/createEditor.ts

	Without a subscription, tip-tap options such as reading "active" won't update and data is lost on refresh
*/

import type { EditorOptions } from '@tiptap/core';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { Editor as CoreEditor } from '@tiptap/core';

export class Editor extends CoreEditor {
	/* eslint-disable-next-line unicorn/no-null */
	public contentElement: HTMLElement | null = null;
}

export const createEditor = (options: Partial<EditorOptions>): Readable<Editor> => {
	const editor = new Editor(options);

	const { subscribe } = readable(editor, (set) => {
		editor.on('transaction', () => {
			set(editor);
		});

		return () => {
			editor.destroy();
		};
	});

	return { subscribe };
};
