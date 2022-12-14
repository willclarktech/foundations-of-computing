export interface State {
	readonly closed: boolean;
	readonly chained: boolean;
	readonly locked: boolean;
}

export const enum Action {
	Close = "Close",
	Open = "Open",
	Chain = "Chain",
	Unchain = "Unchain",
	Lock = "Lock",
	Unlock = "Unlock",
}

export const transition = (previous: State, action: Action): State => {
	switch (action) {
		case Action.Close:
			if (!previous.closed && !previous.locked) {
				return {
					...previous,
					closed: true,
				};
			}
			return previous;
		case Action.Open:
			if (previous.closed && !previous.locked) {
				return {
					...previous,
					closed: false,
				};
			}
			return previous;
		case Action.Chain:
			if (!previous.chained && previous.closed) {
				return {
					...previous,
					chained: true,
				};
			}
			return previous;
		case Action.Unchain:
			if (previous.chained && previous.closed) {
				return {
					...previous,
					chained: false,
				};
			}
			return previous;
		case Action.Lock:
			if (!previous.locked) {
				return {
					...previous,
					locked: true,
				};
			}
			return previous;
		case Action.Unlock:
			if (previous.locked) {
				return {
					...previous,
					locked: false,
				};
			}
			return previous;
		default:
			return previous;
	}
};
