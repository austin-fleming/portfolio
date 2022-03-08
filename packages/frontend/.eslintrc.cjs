const svelteOverrides = {
	files: ["*.svelte"],
	processor: 'svelte3/svelte3',
}


module.exports = {
	extends: ['../../.eslintrc.js'],
	ignorePatterns: ['node_modules', '.eslintrc.cjs'],
	plugins: ['svelte3'],
	overrides: [svelteOverrides],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'svelte3/ignore-styles': () => true
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte', '.cjs'],
		sourceType: 'module',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json']
	},
	env: {
		browser: true,
		es6: true,
		node: true
	}
};
