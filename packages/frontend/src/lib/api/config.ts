export const SERVER_HOST = import.meta.env.PROD
	? import.meta.env.VITE_SERVER_HOST_PRODUCTION
	: import.meta.env.VITE_SERVER_HOST_DEVELOPMENT;
