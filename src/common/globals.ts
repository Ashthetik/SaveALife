import { escape } from "querystring";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * @description Notation for 60 seconds in milliseconds
 */
export const baseLimitIncrease: number = 6e4;

/**
 * @description Notation for 100 in Milliseconds
 */
export const baseLimit: number = 1e2;

/**
 * @description Input sanitizer
 * @argument {string} input
 * @returns {string} Sanitized input
 */
export const sanitize = (input: string): string => {
	input = escape(input);

	// List of patterns to remove or replace
	const patterns = [
		/<script\b[^>]*>([\s\S]*?)<\/script[\s\S]*>/gi,
		/<[^>]*>?/gmi,
		/<\/?[^>]+(>|$)/gi,
		/javascript:/gi,
		/on\w+="[^"]*"/gi,
		/on\w+='[^']*'/gi,
		/on\w+=([^ >]+)/gi,
		/on\w+="([^">]+)"/gi,
		/on\w+='([^'>]+)'/gi,
		/(from|select|insert|delete|where|drop table|show tables|\*|--|\\\\)/gi,
		/(;|'|")/gi,
	];

	let sanitizedInput = input;

	// Iterate over patterns and replace occurrences
	for (const pattern of patterns) {
		sanitizedInput = sanitizedInput.replace(pattern, '');
	}

	return sanitizedInput;
};

/**
 * @description finds the E notation based off the given input
 * @param {number} num 
 * @returns {number}
 */
export const findENotation = (num: number): number => {
	const seconds = num / 1000;
	const exponent = Math.floor(Math.log10(seconds));
	const coefficient = (seconds / Math.pow(10, exponent)).toFixed(2);
	return parseFloat(coefficient + 'e' + exponent);
};

/**
 * @description Generates a random secret
 * @returns {string}
 */
export const secretGenerator = (): string => {
	const secret = require("crypto").getRandomValues(new Uint32Array(36));
    const secureSecret = require("crypto").createHash("sha256").update(secret).digest("hex");

	return secureSecret;
};

/**
 * @description Save Caught Errors to a dated file
 * @param { Error | unknown | string } err 
 */
export const saveError = async (err: Error | unknown | string) => {
    // check if the type is unknown
    if (typeof err === "object") {
        // check if the type is an error
        if (err instanceof Error) {
            // check if the error has a stack
            if (err.stack) {
                // save the error to a file
                const date = new Date();
                const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-e.log`;
                const filePath = path.join(__dirname, "..", "logs", fileName);
                const file = await fs.open(filePath, "a");
                await file.appendFile(`${date.toUTCString()} - ${err.toString()}`);
                await file.close();
            }
        }
    } else {
        // save the error to a file
        const date = new Date();
        const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-e.log`;
        const filePath = path.join(__dirname, "..", "logs", fileName);
        const file = await fs.open(filePath, "a");
        await file.appendFile(`${date.toUTCString()} - ${err}`);
        await file.close();
    }
};

/**
 * @description Save Verbose Logs to a dated file
 * @param { string } message 
 */
export const saveVerbose = async (message: string) => {
    // save the message to a file
    const date = new Date();
    const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-v.log`;
    const filePath = path.join(__dirname, "..", "logs", fileName);
    const file = await fs.open(filePath, "a");
    await file.appendFile(`${date.toUTCString()} - ${message}`);
    await file.close();
};

/**
 * @description Save Info Logs to a dated file
 * @param { string } message 
 */
export const saveLog = async (message: string) => {
    // save the message to a file
    const date = new Date();
    const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-l.log`;
    const filePath = path.join(__dirname, "..", "logs", fileName);
    const file = await fs.open(filePath, "a");
    await file.appendFile(`${date.toUTCString()} - ${message}`);
    await file.close();
};
