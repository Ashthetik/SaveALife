import { Application } from "express";

module.exports = (app: Application) => {
	app.use("/", require("./routes/index.route"));
	app.use("/v1/auth", require("./routes/auth.route"));
	app.use("/v1/analyze", require("./routes/analyze.routes"));
};
