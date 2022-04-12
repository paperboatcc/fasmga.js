/**
 * @module fasmga.js
 * @license MIT
 */

/**
 * @type {unknown}
 */
// eslint-disable-next-line no-unused-vars
let fetch, Response;
import { FasmgaError } from "./error.js";

if (process) {
	const node_fetch = await import("node-fetch");
	fetch = node_fetch.default;
	Response = node_fetch.Response;
}

export class Client {

	/**
	 * @readonly
	 */
	apiUrl = "https://api.fasmga.org";

	/**
	 * @private
	 * @type {string} Your fasmga api token
	 */
	token;

	/**
	 * @private
	 * @type {{ Authorization: string }} Headers used to make requests
	 */
	headers;

	/**
	 * @param {string} token Your fasmga api token
	 */
	constructor(token) {
		if (!token) throw new FasmgaError("You can't create a fasmga.js client without token!");

		this.token = token;
		this.headers = { "Authorization": this.token };
	}

	/**
	 * @private
	 * @package This should be used only py package, you can use getRatelimit()
	 * @returns {Promise<(void | FasmgaError)>} Promise don't have a constant response, normally is a json with data
	 */
	async testConnection() {
		// @ts-expect-error fetch is from browser when used in browsers
		const response = await fetch(`${this.apiUrl}/ratelimit`, { method: "GET", headers: this.headers });
		const json = await response.json();

		if (typeof json !== "object" || json === null) return new FasmgaError("Cannot parse server response");

		// @ts-ignore
		if (json.remain === 0) return new FasmgaError("429 status code");

		return undefined;
	}

	/**
	 * @private
	 * @param {Response} response pass to this function the server response
	 * @returns {Promise<{ response: (object | undefined), error: (FasmgaError | undefined) }>} This should return an object
	 */
	async checkResponse(response) {
		const json = await response.json();

		if (typeof json !== "object" || json === null) return { response: undefined, error: new FasmgaError("Cannot parse server response") };

		if (response.status === 400) return { response: undefined, error: new FasmgaError(`400 status code - ${JSON.stringify(json)}`) };
		else if (response.status === 500) return { response: undefined, error: new FasmgaError("500 status code, internal server error") };
		else if (response.status !== 200) {
			if (process.env.fasmgajs_test === "true") console.table(json);

			return { response: undefined, error: new FasmgaError("Unknown error") };
		}

		return { response: json, error: undefined };
	}

	/**
	 * @description Return data about your ratelimit status
	 * @returns {Promise<{ response: ({ remain: number, message: string } | undefined), error: (FasmgaError | undefined) }>} Response is null when there are an error, else error is null and response is you data about ratelimit
	 */
	async getRatelimit() {
		const testConn = await this.testConnection();

		if (testConn) return { error: testConn, response: undefined };

		// @ts-ignore
		return await this.checkResponse(await fetch(`${this.apiUrl}/ratelimit`, { headers: this.headers }));
	}

	/**
	 * @description Return data about token related user
	 * @returns {Promise<{ response: ({ username: string, is_banned: boolean, "2fa_enabled": boolean, creation_date: number, is_premium: boolean } | undefined), error: (FasmgaError | undefined) }>} Response is null when there are an error, else error is null and response is the user data object
	 */
	async getUser() {
		const testConn = await this.testConnection();

		if (testConn) return { error: testConn, response: undefined };

		// @ts-ignore
		return await this.checkResponse(await fetch(`${this.apiUrl}/user`, { headers: this.headers }));
	}

	/**
	 * @description Return all your url created with token used to create client
	 * @returns {Promise<{ response: ( [{ ID: string, redirect_url: string, owner: string, nsfw: boolean, clicks: number, captcha: boolean, deletedate: number, editinfo: object, unembedify: boolean, securitytype: ("none" | "password"), creationdate: number }] | undefined ), error: (FasmgaError | undefined) }>} List of url
	 */
	async getUrls() {
		const testConn = await this.testConnection();

		if (testConn) return { error: testConn, response: undefined };

		// @ts-ignore
		return await this.checkResponse(await fetch(`${this.apiUrl}/testing/get`, { method: "GET", headers: this.headers }));
	}

	/**
	 * @description Short an url
	 * @param {object} options Object to determine what setting use to short
	 * @param {string} options.url url to short
	 * @param {boolean} options.nsfw url you want to short is nsfw?
	 * @param {string} [options.id] custom id
	 * @param {( "abcdefgh" | "abc12345" | "aBCde" )} [options.idtype] Put this only if you don't use options.id
	 * @param {string} [options.password] password for the url
	 * @param {boolean} [options.captcha] captcha
	 * @param {boolean} [options.unembedify] don't show the embed?
	 * @returns {Promise<{ response: ( { success: string } | undefined ), error: ( FasmgaError | undefined ) }>} Response is the id of url you are created
	 */
	async short(options) {
		const testConn = await this.testConnection();

		if (testConn) return { error: testConn, response: undefined };

		if (!options) return { response: undefined, error: new FasmgaError("You must provide options to create the url") };
		if (!options.url) return { response: undefined, error: new FasmgaError("You must provide an url to short that") };
		if (!options.nsfw && options.nsfw !== false) return { response: undefined, error: new FasmgaError("You must insert nsfw value") };
		if (!options.idtype && !options.id) return { response: undefined, error: new FasmgaError("You must provide an idtype or an id to generate the url") };
		if (!options.url) return { response: undefined, error: new FasmgaError("You must provide an url to short that") };

		// @ts-ignore
		return await this.checkResponse(await fetch(`${this.apiUrl}/testing/create`, { method: "POST", body: JSON.stringify(options), headers: this.headers }));
	}

	/**
	 * @description Delete an url
	 * @param {string} id id of the id you want to delete
	 * @returns {Promise<{ response: ( { success: string } | undefined ), error: ( FasmgaError | undefined ) }>} Response is the id of url you are created
	 */
	async delete(id) {
		const testConn = await this.testConnection();

		if (testConn) return { error: testConn, response: undefined };

		if (!id) return { response: undefined, error: new FasmgaError("You must provide id of the url to delete") };

		// @ts-ignore
		return await this.checkResponse(await fetch(`${this.apiUrl}/testing/delete?id=${id}`, { method: "DELETE", headers: this.headers }));
	}

	/**
	 * @description Edit an url
	 * @param {string} id id of the id you want to edit
	 * @param {object} options options for the edit
	 * @param {boolean} [options.nsfw] url you want to edit is nsfw?
	 * @param {string} [options.password] new password of the url, use #remove# to remove password
	 * @param {boolean} [options.captcha] captcha
	 * @param {boolean} [options.unembedify] don't show the embed?
	 * @returns {Promise<{ response: ( { success: string } | undefined ), error: ( FasmgaError | undefined ) }>} Response is if edit has ben completed
	 */
	async edit(id, options) {
		const testConn = await this.testConnection();

		if (testConn) return { error: testConn, response: undefined };

		if (!options) return { response: undefined, error: new FasmgaError("You must provide options to create the url") };
		if (!options.password && options.nsfw && options.captcha && options.unembedify) return { response: undefined, error: new FasmgaError("You must provide at a least one of \"password\", \"nsfw\", \"captcha\", \"unembedify\"") };

		// @ts-ignore
		return await this.checkResponse(await fetch(`${this.apiUrl}/testing/edit?id=${id}`, { method: "PATCH", body: JSON.stringify(options), headers: this.headers }));
	}

}
