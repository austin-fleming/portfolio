<script lang="ts">
	export let size: 'sm' | 'base' | 'lg' = 'base';
	export let color: 'primary' | 'accent1' | 'error' | 'warn' | 'success' | 'info' = 'primary';
</script>

<span
	class="font-bold px-[1.5em] py-[0.4em] leading-none rounded-[0.25em] tracking-wide"
	class:text-xs="{size === 'sm'}"
	class:text-sm="{size === 'base'}"
	class:text-base="{size === 'lg'}"
	class:color-primary="{color === 'primary'}"
	class:color-accent1="{color === 'accent1'}"
	class:color-error="{color === 'error'}"
	class:color-warn="{color === 'warn'}"
	class:color-success="{color === 'success'}"
	class:color-info="{color === 'info'}"
>
	<slot />
</span>

<style>
	.color-primary {
		@apply bg-background-less text-primary-less;
	}
	.color-accent1 {
		@apply bg-accent1-lesser text-accent1;
	}
	.color-error {
		@apply bg-ui-error-bg text-ui-error;
	}
	.color-warn {
		@apply bg-ui-warn-bg text-ui-warn;
	}
	.color-success {
		@apply bg-ui-success-bg text-ui-success;
	}
	.color-info {
		@apply bg-ui-info-bg text-ui-info;
	}
</style>
