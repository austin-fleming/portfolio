import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$db: path.resolve('./src/db'),
					$lib: path.resolve('./src/lib'),
					$styles: path.resolve('./src/styles'),
					$stores: path.resolve('./src/stores')
				}
			}
		}
	},
};

export default config;
