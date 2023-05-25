import { Application } from "express";
import { header } from "express-validator";
import { getContentType } from "./functions/getContentType";
import analyzer from "./functions/analyze";
import ratelimitMw from "../../middlewares/ratelimit.mw";

module.exports = (app: Application) => {
	app.post("", [
		ratelimitMw.applyLimit,
		header("content-type").exists().withMessage("Content-Type header is required"),
		getContentType,
		analyzer,
	]);
};
