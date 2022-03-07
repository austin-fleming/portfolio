type Timestamp = string;

type Note = {
	_created_at: Timestamp;
	_modified_at: Timestamp;
	body: string;
};

// TODO: DRY-ify
const SERVER_HOST = import.meta.env.PROD
	? import.meta.env.VITE_SERVER_HOST_PRODUCTION
	: import.meta.env.VITE_SERVER_HOST_DEVELOPMENT;

export const fetchNotes = async () => {
	try {
		const response = await fetch(`${SERVER_HOST}/notes/`);
		const json = await response.json();
		return json.data;
	} catch (error) {
		console.error(error);

		return 'errored';
	}
};

export const fetchNoteById = async (id: string) => {
	try {
		const response = await fetch(`${SERVER_HOST}/notes/${id}/`);
		const json = await response.json();
		return json.data;
	} catch (error) {
		console.error(error);

		return 'errored';
	}
};
