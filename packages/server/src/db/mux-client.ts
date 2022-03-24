import Mux from '@mux/mux-node';
import type { RequestOptions as MuxOptions } from '@mux/mux-node/dist/RequestOptions';

// TODO: update to using env.production and env.development with a config file to centralize this.
// fail preflight if any are missing.
const createMuxClient = () => {
	const accessToken =
		process.env.NODE_ENV === 'production'
			? process.env.MUX_ACCESS_TOKEN_PROD
			: process.env.MUX_ACCESS_TOKEN_DEV;
	const secretKey =
		process.env.NODE_ENV === 'production'
			? process.env.MUX_SECRET_KEY_PROD
			: process.env.MUX_SECRET_KEY_DEV;

	if (!accessToken) throw new Error('Missing MUX access token');
	if (!secretKey) throw new Error('Missing MUX secret key');

	const muxOptions: MuxOptions = {};
	return new Mux(accessToken, secretKey, muxOptions);
};

export const muxClient = createMuxClient();
