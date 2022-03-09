/* export class GeneralError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name
    }
} */

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
