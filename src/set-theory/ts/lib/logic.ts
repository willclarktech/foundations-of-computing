export type False = ReadonlySet<never>;
export type True = ReadonlySet<False>;
export type Boolean = True | False;
/**
 * Following Wiener: (x, y) = {{x, 0}, {y}}
 * Note this requires certain special cases to be handled when x or y is 0
 */
export type OrderedPair<A, B> = ReadonlySet<
	ReadonlySet<A | False> | ReadonlySet<B>
>;
export type Function<A, B> = ReadonlySet<OrderedPair<A, B>>;

export const f: False = new Set();
export const t: True = new Set([f]);

export const decodeBoolean = (s: Boolean): boolean => s.size > 0;
export const isEqual = (
	s: ReadonlySet<unknown>,
	t: ReadonlySet<unknown>
): boolean => s.size === t.size && new Set([...s, ...t]).size === s.size;
export const isFalse = (s: ReadonlySet<unknown>): boolean => s.size === 0;

export const apply = <O extends ReadonlySet<unknown>>(
	fn: Function<Boolean, O>,
	s: Boolean
): O => {
	const orderedPair = [...fn.values()].find((b) => {
		// (0, y) = {{0, 0}, {y}} = {{0}, {y}}
		if ([...b.values()].every((v) => v.size === 1)) {
			return isFalse(s);
		}
		if (isFalse(s)) {
			return false;
		}
		const inp = [...b.values()].find((m) => (m as ReadonlySet<Boolean>).has(f));
		if (!inp) {
			throw new Error(`Invalid function ${fn}`);
		}
		return [...inp.values()].some((i) => isEqual(i, s));
	});
	if (!orderedPair) {
		throw new Error(`Cannot apply function ${fn} to input ${s}`);
	}

	const second =
		// (0, 0) = {{0, 0}, {0}} = {0}
		orderedPair.size === 1
			? [...orderedPair.values()][0]
			: // (0, y) = {{0, 0}, {y}} = {{0}, {y}}
			[...orderedPair.values()].every((m) => m.size === 1)
			? [...orderedPair.values()].find((m) =>
					[...m.values()].every((n) => !isFalse(n))
			  )
			: // (x, y) = {{x, 0}, {y}}
			  [...orderedPair.values()].find((value) => {
					return value.size === 1;
			  });
	if (!second) {
		throw new Error(`Invalid ordered pair ${second}`);
	}
	const returnValue = [...(second as ReadonlySet<O>).values()].find(Boolean);
	if (!returnValue) {
		throw new Error(`Invalid function ${fn}`);
	}
	return returnValue;
};

export const simpleNot: Function<Boolean, Boolean> = new Set([
	new Set([new Set([t, f]), new Set([f])]),
	new Set([new Set([f, f]), new Set([t])]),
]);

export const nand: Function<Boolean, Function<Boolean, Boolean>> = new Set([
	new Set([
		new Set([t, f]),
		new Set([
			new Set([
				new Set([new Set([t, f]), new Set([f])]),
				new Set([new Set([f, f]), new Set([t])]),
			]),
		]),
	]),
	new Set([
		new Set([f, f]),
		new Set([
			new Set([
				new Set([new Set([t, f]), new Set([t])]),
				new Set([new Set([f, f]), new Set([t])]),
			]),
		]),
	]),
]);

// Additional logical operators can be implemented by successively applying NAND as usual, eg:
export const not = (s: Boolean): Boolean => apply(apply(nand, s), s);
