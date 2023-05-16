import express, { Request, Response } from 'express';
import { Configuration, OpenAIApi } from "openai";

const openai_config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY as string,
});

const openai = new OpenAIApi(openai_config);

/**
 * Router Definition
 */

const messageRouter = express.Router();

/**
 * controller Methods
 */
messageRouter.post('/messages/test', async (req: Request, res: Response) => {
	const message = req.body.message;
	const response = await openai.createModeration({
		input: message,
		model: "text-moderation-latest"
	});

	const results = response.data.results[0];
	const categories = results.categories;
	
	// test if any of the categories are true
	switch (true) {
		case categories.hate === true:
			// Test the confidence level
			if (results.category_scores.hate > 0.5) {
				res.status(200).send({
					message: "Hate speech detected",
					category: "hate",
					confidence: results.category_scores.hate
				});
			} else {
				res.status(200).send({
					message: "Possible hate speech detected",
					category: "hate",
					confidence: results.category_scores.hate
				});
			}
			break;
		case categories['hate/threatening'] === true:
			// Test the confidence level
			if (results.category_scores['hate/threatening'] > 0.5) {
				res.status(200).send({
					message: "Hate speech detected",
					category: "hate/threatening",
					confidence: results.category_scores['hate/threatening']
				});
			}
			else {
				res.status(200).send({
					message: "Possible hate speech detected",
					category: "hate/threatening",
					confidence: results.category_scores['hate/threatening']
				});
			}
			break;
		case categories['self-harm'] === true:
			// Test the confidence level
			if (results.category_scores['self-harm'] > 0.5) {
				res.status(200).send({
					message: "Self-harm detected",
					category: "self-harm",
					support_links: null, // TODO: Query Koko API for this!
					confidence: results.category_scores['self-harm']
				});
			}
			else {
				res.status(200).send({
					message: "Possible self-harm detected",
					category: "self-harm",
					support_links: null, // TODO: Query Koko API for this!
					confidence: results.category_scores['self-harm']
				});
			}
			break;
		case categories.sexual === true:
			// Test the confidence level
			if (results.category_scores.sexual > 0.5) {
				res.status(200).send({
					message: "Sexual content detected",
					category: "sexual",
					confidence: results.category_scores.sexual
				});
			}
			else {
				res.status(200).send({
					message: "Possible sexual content detected",
					category: "sexual",
					confidence: results.category_scores.sexual
				});
			}
			break;
		case categories["sexual/minors"] === true:
			// Test the confidence level
			if (results.category_scores['sexual/minors'] > 0.5) {
				res.status(200).send({
					message: "Sexualising Minors detected",
					category: "sexual/minors",
					confidence: results.category_scores['sexual/minors']
				});
			}
			else {
				res.status(200).send({
					message: "Possible minor sexualisation detected",
					category: "sexual/minors",
					confidence: results.category_scores['sexual/minors']
				});
			}
			break;
		case categories.violence === true:
			// Test the confidence level
			if (results.category_scores.violence > 0.5) {
				res.status(200).send({
					message: "Violence detected",
					category: "violence",
					confidence: results.category_scores.violence
				});
			}
			else {
				res.status(200).send({
					message: "Possible violence detected",
					category: "violence",
					confidence: results.category_scores.violence
				});
			}
			break;
		case categories["violence/graphic"] === true:
			if (results.category_scores['violence/graphic'] > 0.5) {
				res.status(200).send({
					message: "Graphical violence detected",
					category: "violence/graphic",
					confidence: results.category_scores['violence/graphic']
				});
			}
			else {
				res.status(200).send({
					message: "Possible graphical violence detected",
					category: "violence/graphic",
					confidence: results.category_scores['violence/graphic']
				});
			}
			break;
		default:
			res.status(200).send({
				message: "No issues detected",
				category: null,
				confidence: null
			});
			break;
	}
});

export default messageRouter;
