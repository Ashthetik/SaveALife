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

	/**
     * @description Adds a user to the ratelimit map with the current time.
     * @param {string} id The IP of the user 
     */
	public check(id: string): boolean {
		if (this.ratelimit.has(id)) {
			return true;
		} else {
			this.ratelimit.set(id, Date.now() + 60000);
			return false;
		}
	}

	public remove(id: string) {
		if (this.ratelimit.has(id)) {
			this.ratelimit.delete(id);
			return true;
		}
		else {
			return false;
		}
	};

	public applyLimit(id: string): true {
		if (this.ratelimit.has(id)) {
			const oldTime = this.ratelimit.get(id) as number;
			const newTime = oldTime + 6e4; // Notation for 60s in milliseconds
			return true;
		}
		else {
			return true;
		}
	}
};
