import { Application } from "express";
import { header } from "express-validator";
import { getContentType } from "./functions/getContentType";
import analyzer from "./functions/analyze";

module.exports = (app: Application) => {
	app.post("", [
		header("content-type").exists().withMessage("Content-Type header is required"),
		getContentType,
		analyzer
	]);
};
