/**
 * Required External Modules and Interfaces
 * @swagger 
 * components:
 *  schemas:
 * 	User:
 * 		type: object	
 * 		properties:
 * 			id:
 * 				type: string
 * 			name:
 * 				type: string
 * 			email:
 * 				type: string
 * 			password:
 * 				type: string
 * 			createdAt:
 * 				type: string
 * 			updatedAt:
 * 				type: string
 * 		required:
 * 			- name
 * 			- email
 * 			- password
 * 			- createdAt
 * 			- updatedAt
 * 		example:
 * 			id: 1
 * 			name: "John Doe"
 * 			email: "example@gmail.com"
 */

import express, { Request, Response } from 'express';
import * as UserService from '../common/services/user.service';
import { User } from '../common/interfaces/DTO/user.dto';

/**
 * Router Definition
 */

export const userRouter = express.Router();

/**
 * controller Methods
 */
userRouter.get('/accounts/user/:userId', async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const user: User = await UserService.find(userId);

		res.status(200).send(user);
	}
	catch (e: any) {
		res.status(404).send(e.message);
	}
});

userRouter.get("/accounts/user/application/:id", async (req: Request, res: Response) => {});

userRouter.post("/accounts/user/application/:id", async (req: Request, res: Response) => {});

userRouter.post("/accounts/user/:id", async (req: Request, res: Response) => {});

userRouter.delete("/accounts/user/:id", async (req: Request, res: Response) => {});

userRouter.delete("/accounts/user/application/:id", async (req: Request, res: Response) => {});

userRouter.put("/accounts/user/:id", async (req: Request, res: Response) => {});

userRouter.put("/accounts/user/application/:id", async (req: Request, res: Response) => {});