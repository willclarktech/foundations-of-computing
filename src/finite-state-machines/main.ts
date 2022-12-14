import { Action, State, transition } from "./lib";

const main = (actions: readonly Action[]): void => {
	const initialState: State = { closed: true, chained: true, locked: true };
	actions.reduce((previous, action) => {
		const result = transition(previous, action);
		console.log(action, result);
		return result;
	}, initialState);
};

main([
	Action.Unlock,
	Action.Open,
	Action.Close,
	Action.Unchain,
	Action.Open,
	Action.Lock,
]);
