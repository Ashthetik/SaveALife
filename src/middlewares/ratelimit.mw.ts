import { Request, Response, NextFunction } from "express";
import { findENotation } from "../common/globals";

export default new class RateLimit {
	/**
     * @description Self-initialising ratelimit map and clearing the map every 5 minutes
     * @param timeToClear The time in milliseconds to clear the ratelimit map
     */
	constructor(timeToClear: number = 60000) {
		this.ratelimit = new Map();

		setInterval(() => {
			this.ratelimit.forEach((v, k) => {
				if (v <= Date.now()) {
					this.ratelimit.delete(k);
				}
			}, timeToClear)
		});
	};

	private ratelimit: Map<string, number>;


	public remove(id: string) {
		if (this.ratelimit.has(id)) {
			this.ratelimit.delete(id);
			return true;
		}
		else {
			return false;
		}
	};

	public applyLimit(req: Request, res: Response, next: NextFunction) {
		const id = req.ip;
		if (this.ratelimit.has(id)) {
			const oldTime = this.ratelimit.get(id) as number;
			const newTime = oldTime + 6e4; // Notation for 60s in milliseconds
			this.ratelimit.set(id, newTime);
			return res.status(429).json({
				status: 429,
				message: 'Too many requests'
			});
		}
		else {
			this.ratelimit.set(id, Date.now() + findENotation(1000));
			return next();
		}
	}
};
