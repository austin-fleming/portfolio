// TODO: DRY-ify
type ServerResponse = {
	links: Record<string, string>;
	message: string;
};

// TODO: DRY-ify
const SERVER_HOST = import.meta.env.PROD
	? import.meta.env.VITE_SERVER_HOST_PRODUCTION
	: import.meta.env.VITE_SERVER_HOST_DEVELOPMENT;

// TODO: error checking
export const fetchCaseStudies = async () => {
	try {
		const response = await fetch(`${SERVER_HOST}/case-studies/`);
		const json = await response.json();
		return json.data;
	} catch (error) {
		console.error(error);

		return 'errored';
	}
};
