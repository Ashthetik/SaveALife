/**
 * Required Modules
 */
import { config } from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { expressjwt as jwt } from 'express-jwt';
import { createServer as http } from "http";
import { createServer as https } from 'https';
import { saveError, secretGenerator } from './common/globals';
import { readFileSync } from 'fs';

config();

/**
 * App Variables
 */
const app: Application = express();

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwt({
	"secret": secretGenerator(),
	"algorithms": ["HS256"],
	"credentialsRequired": false,
}));
require("./router")(app);

/**
 * Configure Accepted Headers
 */
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Auth-Token");
    next();
});

/**
 * Server Configuration
 * And Activations
 */
const creds = {
	key: readFileSync("./certs/key.pem", "utf-8"),
	cert: readFileSync("./certs/cert.pem", "utf-8")
};

const secureServer = https(creds, app);
const baseServer = http(app);

secureServer.listen(443, () => {
	console.log(`[INFO] [HTTPS] Server is running on port 443`);
});

baseServer.listen(80, () => {
	console.log(`[INFO] [HTTP] Server is running on port 80`);
});

/**
 *  Handle unhandled promise rejections
 */
process.on("unhandledRejection", (err) => {
    console.log(`Unhandled rejection: ${err}`);
    // Send error to error logging service
    saveError(err);
});
