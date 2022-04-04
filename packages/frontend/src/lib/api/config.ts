// TODO: pull all public .env variables through here. rename to "public_config" or similar. Validate all at build time.

export const SERVER_HOST = import.meta.env.PROD
	? import.meta.env.VITE_SERVER_HOST_PRODUCTION
	: import.meta.env.VITE_SERVER_HOST_DEVELOPMENT;

// TODO: replace .env and above with below. Update everywhere
export const API_HOST = `${SERVER_HOST}/api`;
