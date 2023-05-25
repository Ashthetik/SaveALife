import { Response, Request, NextFunction } from "express";

export function getContentType(req: Request, res: Response, next: NextFunction) {
	const contentType = req.headers["content-type"];
	if (!contentType) {
		return res.status(400).send("Bad Request");
	}
	switch (contentType) {
		// Media Types Accepted: Images and Videos
		case "image/jpeg":next();
		case "image/png":next();
		case "image/gif":next();
		case "video/mp4":next();
		case "video/mpeg":next();
		case "video/ogg":next();
		case "video/webm":next();
		default:return res.status(415).send("Unsupported Media Type");
	}
};
