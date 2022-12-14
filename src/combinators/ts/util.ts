import type { Combinator } from "./lib";

export const lambdaToBool = (f: Combinator): boolean =>
	f(true as unknown as Combinator)(
		false as unknown as Combinator
	) as unknown as boolean;
export const lambdaToNumeral = (n: Combinator): number =>
	n((k) => ((k as unknown as number) + 1) as unknown as Combinator)(
		0 as unknown as Combinator
	) as unknown as number;
