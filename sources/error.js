export class FasmgaError extends Error {

	/**
	 * @package
	 * @param {string} message Message of the error
	 */
	constructor (message) {
		super(message);

		Reflect.setPrototypeOf(this, FasmgaError.prototype);
	}
}
