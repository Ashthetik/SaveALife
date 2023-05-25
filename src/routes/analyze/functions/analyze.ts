import {
	Request,
	Response,
	NextFunction
} from "express";
import Predictor from "./predictor"
import { unlinkSync } from "fs";

export default async function analyzer(
	req: Request, 
	res: Response
) {
	// Get the image from the request
	let image = req.on('data', (chunk) => {
		image += chunk;
	});

	const result = await Predictor.runDetect(image, `${__dirname}/temp/${image}`);
	if (result?.nude) {
		unlinkSync(`${__dirname}/temp/${image}`);
		res.status(200).json({
			status: 200,
			flagged: true,
			message: 'Image contains nudity',
			results: [result]
		});
		return;
	}
	else if (result?.sexy) {
		unlinkSync(`${__dirname}/temp/${image}`);
		res.status(200).json({
			status: 200,
			flagged: true,
			message: 'Image contains suggestive content',
			results: [result]
		});
		return;
	}
	else {
		unlinkSync(`${__dirname}/temp/${image}`);
		res.status(200).json({
			status: 200,
			flagged: false,
			message: 'Image does not contain nudity',
			results: [result]
		});
		return;
	}
};
