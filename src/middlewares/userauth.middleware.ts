import { Response, NextFunction } from "express";
import DatabaseHandler from "../common/database/data.handler";

export const isUserAuthenticated = (
	req: any, 
	res: Response, 
	next: NextFunction
) => {
	const token = req.headers.authorization.split(' ')[1];

    if (token) {
		return VerifyTokenAndGetUID(token)
			.then((userId) => {
				res.locals.auth = {
					userId
				}
				next()
			})
			.catch((err) => {
				console.error(err)

				return res.status(401).json({
					status: 401,
					message: 'UNAUTHORIZED'
				})
			});
	}
	return res.status(403).json({
		status: 403,
		message: 'FORBIDDEN'
	});
};

const VerifyTokenAndGetUID = async (token: string) => {
	const db = new DatabaseHandler();
	const uid = await db.select("users", { token: token });
	return uid;
};