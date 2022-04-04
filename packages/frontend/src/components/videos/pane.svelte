<div class="pane">
	<div class="header"><slot name="title" /></div>

	<div class="content">
		<div class="scroll-box">
			<slot name="content" />
		</div>
	</div>
</div>

<style>
	.pane {
		@apply h-full overflow-y-hidden flex flex-col;
	}
	.header {
		@apply w-full p-4 border-b-[1px] border-solid border-primary font-bold;
	}
	.content {
		@apply w-full h-full relative;
	}
	.scroll-box {
		@apply absolute top-0 right-0 bottom-0 left-0 p-4 overflow-y-scroll;
	}
</style>
