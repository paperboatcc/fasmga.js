export class Client {
    /**
     * @param {string} token Your fasmga api token
     */
    constructor(token: string);
    /**
     * @readonly
     */
    readonly apiUrl: "https://api.fasmga.org";
    /**
     * @private
     * @type {string} Your fasmga api token
     */
    private token;
    /**
     * @private
     * @type {{ Authorization: string }} Headers used to make requests
     */
    private headers;
    /**
     * @private
     * @package This should be used only py package, you can use getRatelimit()
     * @returns {Promise<(void | FasmgaError)>} Promise don't have a constant response, normally is a json with data
     */
    private testConnection;
    /**
     * @private
     * @param {Response} response pass to this function the server response
     * @returns {Promise<{ response: (object | undefined), error: (FasmgaError | undefined) }>} This should return an object
     */
    private checkResponse;
    /**
     * @description Return data about your ratelimit status
     * @returns {Promise<{ response: ({ remain: number, message: string } | undefined), error: (FasmgaError | undefined) }>} Response is null when there are an FasmgaError, else FasmgaError is null and response is you data about ratelimit
     */
    getRatelimit(): Promise<{
        response: ({
            remain: number;
            message: string;
        } | undefined);
        error: (FasmgaError | undefined);
    }>;
    /**
     * @description Return data about token related user
     * @returns {Promise<{ response: ({ username: string, is_banned: boolean, "2fa_enabled": boolean, creation_date: number, is_premium: boolean } | undefined), error: (FasmgaError | undefined) }>} Response is null when there are an FasmgaError, else FasmgaError is null and response is the user data object
     */
    getUser(): Promise<{
        response: ({
            username: string;
            is_banned: boolean;
            "2fa_enabled": boolean;
            creation_date: number;
            is_premium: boolean;
        } | undefined);
        error: (FasmgaError | undefined);
    }>;
    /**
     * @description Return all your url created with token used to create client
     * @returns {Promise<{ response: ( [{ ID: string, redirect_url: string, owner: string, nsfw: boolean, clicks: number, captcha: boolean, deletedate: number, editinfo: object, unembedify: boolean, securitytype: ("none" | "password"), creationdate: number }] | undefined ), error: (FasmgaError | undefined) }>} List of url
     */
    getUrls(): Promise<{
        response: ([{
            ID: string;
            redirect_url: string;
            owner: string;
            nsfw: boolean;
            clicks: number;
            captcha: boolean;
            deletedate: number;
            editinfo: object;
            unembedify: boolean;
            securitytype: ("none" | "password");
            creationdate: number;
        }] | undefined);
        error: (FasmgaError | undefined);
    }>;
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
    short(options: {
        url: string;
        nsfw: boolean;
        id?: string | undefined;
        idtype?: "abcdefgh" | "abc12345" | "aBCde" | undefined;
        password?: string | undefined;
        captcha?: boolean | undefined;
        unembedify?: boolean | undefined;
    }): Promise<{
        response: ({
            success: string;
        } | undefined);
        error: (FasmgaError | undefined);
    }>;
    /**
     * @description Delete an url
     * @param {string} id id of the id you want to delete
     * @returns {Promise<{ response: ( { success: string } | undefined ), error: ( FasmgaError | undefined ) }>} Response is the id of url you are created
     */
    delete(id: string): Promise<{
        response: ({
            success: string;
        } | undefined);
        error: (FasmgaError | undefined);
    }>;
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
    edit(id: string, options: {
        nsfw?: boolean | undefined;
        password?: string | undefined;
        captcha?: boolean | undefined;
        unembedify?: boolean | undefined;
    }): Promise<{
        response: ({
            success: string;
        } | undefined);
        error: (FasmgaError | undefined);
    }>;
}
import { FasmgaError } from "./error.js";
