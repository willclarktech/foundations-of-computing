/**
 * Von Neumann ordinals
 *
 * Note that not all instances of the Ordinal type are valid Von Neumann ordinals in this encoding but successively incrementing from Zero will result in valid ordinals.
 * 0: {}
 * 1: {{}}
 * 2: {{}, {{}}}
 * 3: {{}, {{}}, {{}, {{}}}}
 */

export type Ordinal = ReadonlySet<Ordinal>;
export const zero: Ordinal = new Set();

export const decodeOrdinal = (n: Ordinal): number => n.size;
export const isZero = (n: Ordinal): boolean => n.size === 0;

export const increment = (n: Ordinal): Ordinal => new Set([...n, n]);
export const decrement = (n: Ordinal): Ordinal => {
	if (isZero(n)) {
		throw new Error("Cannot decrement 0");
	}
	return new Set([...n].filter((m) => m.size !== n.size - 1));
};

export const one = increment(zero);
export const two = increment(one);
export const three = increment(two);
export const twoAgain = decrement(three);
export const oneAgain = decrement(two);
export const zeroAgain = decrement(one);
// export const notAnOrdinal = decrement(zero); // throws

export const add = (n: Ordinal, m: Ordinal): Ordinal =>
	isZero(m) ? n : add(increment(n), decrement(m));

export const subtract = (n: Ordinal, m: Ordinal): Ordinal =>
	isZero(m) ? n : subtract(decrement(n), decrement(m));

export const multiply = (n: Ordinal, m: Ordinal): Ordinal =>
	isZero(m) ? zero : add(n, multiply(n, decrement(m)));

/** Calculates a tuple of [integer division, modulus] */
export const divide = (n: Ordinal, m: Ordinal): readonly [Ordinal, Ordinal] => {
	if (isZero(m)) {
		throw new Error("Cannot divide by 0");
	}
	if (isZero(decrement(m))) {
		return [n, zero];
	}
	let subtractionResult: Ordinal;
	try {
		subtractionResult = subtract(n, m);
	} catch {
		return [zero, n];
	}
	const [divisor, modulus] = divide(subtractionResult, m);
	return [increment(divisor), modulus];
};

export const integerDivide = (n: Ordinal, m: Ordinal): Ordinal =>
	divide(n, m)[0];
export const modulo = (n: Ordinal, m: Ordinal): Ordinal => divide(n, m)[1];
