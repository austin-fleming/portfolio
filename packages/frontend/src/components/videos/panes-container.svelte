<div class="panes-container">
	<section id="navigator-pane" class="pane pane--navigator">
		<slot name="sidebar" />
	</section>

	<section id="editor-pane" class="pane pane--editor">
		<slot name="editor" />
	</section>
</div>

<style>
	.panes-container {
		@apply w-full flex flex-row min-h-full h-screen pt-header;
	}

	.pane {
		@apply flex flex-col justify-between w-full;
	}
	.pane--navigator {
		@apply w-1/4 border-r-2 border-solid border-primary shadow-2xl;
	}
	.pane--editor {
		@apply w-3/4;
	}
</style>
