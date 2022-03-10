<script lang="ts">
	// import { Editor, getHTMLFromFragment } from '@tiptap/core';
	import type { Editor as EditorType, EditorOptions } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Typography from '@tiptap/extension-typography';
	// import BubbleMenu from '@tiptap/extension-bubble-menu';
	// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import { onDestroy, onMount } from 'svelte';
	import { createEditor, Editor } from '$lib/tip-tap/create-editor';
	import type { Readable } from 'svelte/store';
	import { cloin } from '$lib/cloin';
	// import { generateHTML } from '@tiptap/html/src';
	import RichTextIcon from './rich-text-icon.svelte';

	// import { lowlight } from 'lowlight/lib/common';

	let element: EditorOptions['element'];
	// let editor: EditorType;

	let data: string | undefined;

	let editor: Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			editorProps: {
				attributes: {
					class:
						'prose prose-base border-2 border-slate-900 border-solid w-full max-w-full h-[30ch] overflow-y-scroll overflow-y-hidden'
				}
			},
			element: element,
			extensions: [
				/* BubbleMenu.configure({
					element: document.querySelector('.bubble-menu')
				}), */
				StarterKit.configure({
					heading: {
						levels: [1, 2, 3, 4],
						HTMLAttributes: {
							class: 'this-is-a-test another-test'
						}
					}
				}),
				Typography
			],
			content: '<p>Test</p>'
		});
	});

	onDestroy(() => {
		if ($editor) $editor.destroy();
	});

	$: isActive = (name: string, attributes = {}) => $editor.isActive(name, attributes);

	const buttonClass = 'editor-btn';
</script>

<!-- Editor mount point -->
<div>
	<button on:click="{() => (data = $editor.getHTML())}">output</button>

	{#if data}
		<div class="w-full prose">{@html data}</div>
	{/if}
	<!-- {#if data}
		<div class="w-full prose">{data}</div>
	{/if} -->
	<!-- {#if data}
		<pre class="w-full prose">{JSON.stringify(data, null, '\t')}</pre>
	{/if} -->

	<div class="w-full flex flex-row flex-wrap text-sm gap-[0.25em]">
		{#if editor}
			<!-- CLEAR MARKS -->
			<!-- <button on:click="{() => $editor.chain().focus().unsetAllMarks().run()}" class="editor-btn"
				>Clear Marks</button
			> -->
			<div aria-label="inline styles" class="bg-slate-200 rounded flex flex-row items-center">
				<!-- BOLD -->
				<button
					title="bold"
					on:click="{() => $editor.chain().focus().toggleBold().run()}"
					class="{cloin(buttonClass, isActive('bold') && 'active')}"
					><RichTextIcon name="bold" /></button
				>
				<!-- ITALIC -->
				<button
					title="italic"
					on:click="{() => $editor.chain().focus().toggleItalic().run()}"
					class="{cloin(buttonClass, isActive('italic') && 'active')}"
					><RichTextIcon name="italic" /></button
				>
				<!-- STRIKE -->
				<button
					title="strike through"
					on:click="{() => $editor.chain().focus().toggleStrike().run()}"
					class="{cloin(buttonClass, isActive('strike') && 'active')}"
					><RichTextIcon name="strikeThrough" /></button
				>
				<!-- CODE -->
				<button
					title="inline code"
					on:click="{() => $editor.chain().focus().toggleCode().run()}"
					class="{cloin(buttonClass, isActive('code') && 'active')}">{'</>'}</button
				>
			</div>

			<!-- CLEAR NODES -->
			<!-- <button on:click="{() => $editor.chain().focus().clearNodes().run()}" class="editor-btn"
				>Clear Nodes</button
			> -->

			<div aria-label="elements" class="bg-slate-200 rounded">
				<!-- PARAGRAPH -->
				<button
					title="paragraph"
					on:click="{() => $editor.chain().focus().setParagraph().run()}"
					class="{cloin(buttonClass, isActive('paragraph') && 'active')}"
					><RichTextIcon name="paragraph" /></button
				>
				<!-- H1 -->
				<button
					title="heading 1"
					on:click="{() => $editor.chain().focus().toggleHeading({ level: 1 }).run()}"
					class="{cloin(buttonClass, isActive('heading', { level: 1 }) && 'active')}">H1</button
				>
				<!-- H2 -->
				<button
					title="heading 2"
					on:click="{() => $editor.chain().focus().toggleHeading({ level: 2 }).run()}"
					class="{cloin(buttonClass, isActive('heading', { level: 2 }) && 'active')}">H2</button
				>
				<!-- H3 -->
				<button
					title="heading 3"
					on:click="{() => $editor.chain().focus().toggleHeading({ level: 3 }).run()}"
					class="{cloin(buttonClass, isActive('heading', { level: 3 }) && 'active')}">H3</button
				>
				<!-- H4 -->
				<button
					title="heading 4"
					on:click="{() => $editor.chain().focus().toggleHeading({ level: 4 }).run()}"
					class="{cloin(buttonClass, isActive('heading', { level: 4 }) && 'active')}">H4</button
				>

				<!-- LIST, BULLET -->
				<button
					title="unordered list"
					on:click="{() => $editor.chain().focus().toggleBulletList().run()}"
					class="{cloin(buttonClass, isActive('bulletList') && 'active')}"
					><RichTextIcon name="unorderedList" /></button
				>
				<!-- LIST, ORDERED -->
				<button
					title="ordered list"
					on:click="{() => $editor.chain().focus().toggleOrderedList().run()}"
					class="{cloin(buttonClass, isActive('orderedList') && 'active')}"
					><RichTextIcon name="orderedList" /></button
				>
				<!-- TODO: see if there is a language parser or syntax highlighting for this. -->
				<!-- CODE BLOCK -->
				<button
					title="code block"
					data-tooltip="CMD ALT C"
					on:click="{() => $editor.chain().focus().toggleCodeBlock().run()}"
					class="{cloin(buttonClass, isActive('codeBlock') && 'active')}">Code Block</button
				>
			</div>

			<div aria-label="wrapper styles" class="bg-slate-200 rounded">
				<!-- BLOCKQUOTE -->
				<button
					title="blockquote"
					on:click="{() => $editor.chain().focus().toggleBlockquote().run()}"
					class="{cloin(buttonClass, isActive('blockquote') && 'active')}">Blockquote</button
				>
			</div>

			<div aria-label="layout elements" class="bg-slate-200 rounded">
				<!-- HORIZONTAL RULE -->
				<button
					title="horizontal rule"
					on:click="{() => $editor.chain().focus().setHorizontalRule().run()}"
					class="editor-btn">HR</button
				>
				<!-- HARD BREAK -->
				<button
					title="hard break"
					on:click="{() => $editor.chain().focus().setHardBreak().run()}"
					class="editor-btn"><RichTextIcon name="hardBreak" /></button
				>
			</div>

			<div aria-label="commands" class="bg-slate-200 rounded">
				<!-- UNDO -->
				<button
					title="undo"
					on:click="{() => $editor.chain().focus().undo().run()}"
					class="editor-btn">Undo</button
				>
				<!-- REDO -->
				<button
					title="redo"
					on:click="{() => $editor.chain().focus().redo().run()}"
					class="editor-btn">Redo</button
				>
			</div>
		{/if}
	</div>
	<div bind:this="{element}"></div>
</div>

<!-- 
{
	"type": "doc",
	"content": [
		{
			"type": "paragraph",
			"content": [
				{
					"type": "text",
					"text": "Test"
				}
			]
		},
		{
			"type": "heading",
			"attrs": {
				"level": 1
			},
			"content": [
				{
					"type": "text",
					"text": "fdsfds "
				},
				{
					"type": "text",
					"marks": [
						{
							"type": "italic"
						}
					],
					"text": "hgfhgf "
				},
				{
					"type": "text",
					"text": "hhgf"
				}
			]
		},
		{
			"type": "paragraph",
			"content": [
				{
					"type": "text",
					"text": "fdsfdsfdsfds fjds fds. fdsaf fdsa fdsa fdsa fdsa"
				}
			]
		},
		{
			"type": "bulletList",
			"content": [
				{
					"type": "listItem",
					"content": [
						{
							"type": "paragraph",
							"content": [
								{
									"type": "text",
									"text": "fdsfds hhjkkh hjk"
								}
							]
						},
						{
							"type": "bulletList",
							"content": [
								{
									"type": "listItem",
									"content": [
										{
											"type": "paragraph",
											"content": [
												{
													"type": "text",
													"text": "fdsjhkfhds fds"
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					"type": "listItem",
					"content": [
						{
							"type": "paragraph",
							"content": [
								{
									"type": "text",
									"text": "fdshjkfdshjkfs"
								}
							]
						}
					]
				}
			]
		},
		{
			"type": "codeBlock",
			"attrs": {
				"language": null
			},
			"content": [
				{
					"type": "text",
					"text": "fdsafs fdsa fds f fds\n{\n   fdsklf fds fds;\n}"
				}
			]
		},
		{
			"type": "blockquote",
			"content": [
				{
					"type": "paragraph",
					"content": [
						{
							"type": "text",
							"text": "fdsfs fdsa fdsa "
						}
					]
				},
				{
					"type": "heading",
					"attrs": {
						"level": 2
					},
					"content": [
						{
							"type": "text",
							"text": "fsfdsfdsfds"
						}
					]
				},
				{
					"type": "paragraph",
					"content": [
						{
							"type": "text",
							"text": "fdsaffsdfsdsfds"
						}
					]
				}
			]
		},
		{
			"type": "paragraph",
			"content": [
				{
					"type": "text",
					"marks": [
						{
							"type": "code"
						}
					],
					"text": "fdsfds hjk hjk"
				},
				{
					"type": "text",
					"text": "fdshjk fds fds feds"
				}
			]
		}
	]
}


 -->
<style>
	.editor-btn {
		@apply relative text-slate-800 px-[1em] py-[0.5em] text-sm rounded leading-none;
	}
	.editor-btn:hover,
	.editor-btn.active {
		@apply bg-slate-800 text-slate-50;
	}

	.editor-btn[data-tooltip]:before {
		position: absolute;
		content: attr(data-tooltip);
		opacity: 0;
		bottom: 0;
		right: 0;
		transform: translateY(100%);

		@apply border-2 border-solid border-slate-800 bg-slate-50;
	}
	.editor-btn[data-tooltip]:hover:before {
		opacity: 1;
	}
</style>
