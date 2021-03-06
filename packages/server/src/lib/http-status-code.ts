export enum HttpStatusCode {
	OK = 200,
	RESOURCE_CREATED = 201,
	NO_CONTENT = 204,
	MOVED_PERMANENTLY = 301,
	MOVED_TEMPORARILY = 302,
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	TEAPOT = 418,
	INTERNAL_SERVER_ERROR = 500,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503
}
