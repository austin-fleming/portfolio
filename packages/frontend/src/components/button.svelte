<script lang="ts">
	// REF: https://github.com/illright/attractions/blob/main/attractions/button/button.scss
	/* eslint-disable unicorn/no-null */
	import { cloin } from '$lib/cloin';

	import type { Nullable } from '@repo/shared';

	export let prefetch = true;
	export let isExternal = false;
	export let href: Nullable<string> = null;
	export let isDisabled = false;
	export let isSelected = false;

	type ButtonAnimation = 'none' | 'arrow' | 'cancel';
	export let interaction: ButtonAnimation = 'none';

	type ButtonRound = 'none' | 'base' | 'full';
	export let round: ButtonRound = 'none';

	type ButtonStyle = 'fill' | 'outline' | 'text';
	export let style: ButtonStyle = 'fill';

	type ButtonColor = 'primary' | 'secondary' | 'accent' | 'success' | 'error';
	export let color: ButtonColor = 'primary';

	type ButtonSize = 'lg' | 'base' | 'sm';
	export let size: ButtonSize = 'base';

	type ButtonType = 'button' | 'reset' | 'submit';
	export let buttonType: ButtonType = 'button';

	const relationships = cloin(
		isExternal && 'noopener noreferrer',
		prefetch && !isExternal && 'prefetch'
	);
</script>

<!-- TODO: find a way to not repeat props of 'a' and 'button'. Svelte is about to merge 'svelte:element', so circle back. -->
{#if href}
	<a
		class="btn"
		href="{href}"
		sveltekit:prefetch="{prefetch || null}"
		rel="{relationships}"
		class:color-primary="{color === 'primary'}"
		class:color-secondary="{color === 'secondary'}"
		class:color-accent="{color === 'accent'}"
		class:color-success="{color === 'success'}"
		class:color-error="{color === 'error'}"
		class:size-small="{size === 'sm'}"
		class:size-base="{size === 'base'}"
		class:size-large="{size === 'lg'}"
		class:style-filled="{style === 'fill'}"
		class:style-outline="{style === 'outline'}"
		class:style-text="{style === 'text'}"
		class:round-none="{round === 'none'}"
		class:round-base="{round === 'base'}"
		class:round-full="{round === 'full'}"
		class:disabled="{isDisabled}"
		class:interaction-slide-in-icon="{interaction === 'arrow' || interaction === 'cancel'}"
		{...$$restProps}
	>
		{#if interaction === 'arrow'}
			<slot />
			<span class="btn-interaction-slide-in-icon">-></span>
		{:else if interaction === 'cancel'}
			<slot />
			<span class="btn-interaction-slide-in-icon">X</span>
		{:else}
			<slot />
		{/if}
	</a>
{:else}
	<button
		class="btn"
		type="{buttonType}"
		class:color-primary="{color === 'primary'}"
		class:color-secondary="{color === 'secondary'}"
		class:color-accent="{color === 'accent'}"
		class:color-success="{color === 'success'}"
		class:color-error="{color === 'error'}"
		class:size-small="{size === 'sm'}"
		class:size-base="{size === 'base'}"
		class:size-large="{size === 'lg'}"
		class:style-filled="{style === 'fill'}"
		class:style-outline="{style === 'outline'}"
		class:style-text="{style === 'text'}"
		class:round-none="{round === 'none'}"
		class:round-base="{round === 'base'}"
		class:round-full="{round === 'full'}"
		class:disabled="{isDisabled}"
		class:interaction-slide-in-icon="{interaction === 'arrow' || interaction === 'cancel'}"
		on:click
		{...$$restProps}
	>
		{#if interaction === 'arrow'}
			<slot />
			<span class="btn-interaction-slide-in-icon">-></span>
		{:else if interaction === 'cancel'}
			<slot />
			<span class="btn-interaction-slide-in-icon">X</span>
		{:else}
			<slot />
		{/if}
	</button>
{/if}

<style lang="scss">
	.btn {
		@apply block relative py-[0.5em] px-[1.75em] text-center font-bold;
		/* standardize border to avoid dimensional differences between styles */
		@apply border-[0.125em] border-solid border-transparent;
	}

	.disabled {
		@apply pointer-events-none;
	}

	.size-small {
		@apply text-xs;
	}
	.size-base {
		@apply text-sm;
	}
	.size-large {
		@apply text-base;
	}

	.style-filled {
		&.color-primary {
			@apply bg-primary text-background;
		}
		&.color-secondary {
			@apply bg-primary-less text-background-less;
		}
		&.color-accent {
			@apply bg-accent1 text-background;
		}
		&.color-error {
			@apply bg-ui-error-bg text-ui-error;
		}
		&.color-success {
			@apply bg-ui-success text-ui-success-bg;
		}

		&.disabled {
			@apply bg-primary-lesser text-background-less;
		}
	}
	.style-outline {
		&.color-primary {
			@apply bg-transparent border-primary text-primary;
		}
		&.color-secondary {
			@apply bg-transparent border-primary-less text-primary-less;
		}
		&.color-accent {
			@apply bg-transparent border-accent1 text-accent1;
		}
		&.color-error {
			@apply bg-transparent border-ui-error text-ui-error;
		}
		&.color-success {
			@apply bg-transparent border-ui-success text-ui-success;
		}

		&.disabled {
			@apply bg-background-less border-transparent text-primary-lesser;
		}
	}
	.style-text {
		&.color-primary {
			@apply bg-transparent text-primary;
		}
		&.color-secondary {
			@apply bg-transparent text-primary-less;
		}
		&.color-accent {
			@apply bg-transparent text-accent1;
		}
		&.color-error {
			@apply bg-transparent text-ui-error;
		}
		&.color-success {
			@apply bg-transparent text-ui-success;
		}

		&.disabled {
			@apply bg-background-less text-primary-lesser;
		}
	}

	.round-none {
		@apply rounded-none;
	}
	.round-base {
		@apply rounded-[0.75em];
	}
	.round-full {
		@apply rounded-full;
	}

	.interaction-slide-in-icon {
		@apply overflow-hidden transition-all duration-200;

		& .btn-interaction-slide-in-icon {
			@apply absolute top-0 right-0 bottom-0 flex flex-row justify-start items-center left-auto w-[1.75em] translate-x-full transition-transform duration-200;
		}

		&:hover {
			/* @apply pl-[0.875em] pr-[2.625em]; */
			@apply pl-[1em] pr-[2.5em];

			& .btn-interaction-slide-in-icon {
				@apply translate-x-0;
			}
		}
	}
</style>
