/**
 * Required Modules
 */
import { config } from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userRouter } from './routes/router';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/404.middleware';

config();

/**
 * App Variables
 */
if (!process.env.PORT) {
	console.log('[WARN] Error to get ports, defaulting to 5000');
	process.env.PORT = '5000';
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app: Application = express();

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/v1", userRouter);
app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Configuration
 * And Activations
 */
app.listen(PORT, () => {
	console.log(`[INFO] Server is running on port ${PORT}`);
});