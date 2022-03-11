module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        accent1: {
          DEFAULT: `var(--c-accent-1)`,
          less: `var(--c-accent-1--less)`,
          lesser: `var(--c-accent-1--lesser)`,
        },
        background: {
          DEFAULT: `var(--c-background)`,
          less: `var(--c-background--less)`,
          lesser: `var(--c-background--lesser)`,
        },
        primary: {
          DEFAULT: `var(--c-primary)`,
          less: `var(--c-primary--less)`,
          lesser: `var(--c-primary--lesser)`,
        },
        ui: {
          error: {
            bg: `var(--c-ui-error--bg)`,
            DEFAULT: `var(--c-ui-error)`,
          },
          info: {
            bg: `var(--c-ui-info--bg)`,
            DEFAULT: `var(--c-ui-info)`,
          },
          success: {
            bg: `var(--c-ui-success--bg)`,
            DEFAULT: `var(--c-ui-success)`,
          },
          warn: {
            bg: `var(--c-ui-warn--bg)`,
            DEFAULT: `var(--c-ui-warn)`,
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
