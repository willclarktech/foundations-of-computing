/**
 * Von Neumann ordinals
 *
 * Note that not all instances of the Ordinal export type are valid Von Neumann ordinals in this encoding but successively incrementing from Zero will result in valid ordinals.
 * 0: {}
 * 1: {{}}
 * 2: {{}, {{}}}
 * 3: {{}, {{}}, {{}, {{}}}}
 */

export type Zero = [];
export type Ordinal = Zero | Ordinal[];

export type Decode<N extends Ordinal> = N["length"];

export type Increment<N extends Ordinal> = [...N, N];
export type Decrement<N extends Ordinal> = N extends [
	...infer M extends Ordinal,
	unknown
]
	? M
	: never;

export type One = Increment<Zero>;
export type Two = Increment<One>;
export type Three = Increment<Two>;
export type TwoAgain = Decrement<Three>;
export type OneAgain = Decrement<TwoAgain>;
export type ZeroAgain = Decrement<OneAgain>;
export type NotAnOrdinal = Decrement<ZeroAgain>;

export type Add<N extends Ordinal, M extends Ordinal> = M extends Zero
	? N
	: Add<Increment<N>, Decrement<M>>;
export type Subtract<N extends Ordinal, M extends Ordinal> = M extends Zero
	? N
	: Subtract<Decrement<N>, Decrement<M>>;
export type Multiply<N extends Ordinal, M extends Ordinal> = M extends Zero
	? Zero
	: Add<N, Multiply<N, Decrement<M>>>;

/** Calculates a tuple of [integer division, modulus] */
export type Divide<N extends Ordinal, M extends Ordinal> = M extends Zero
	? never
	: M extends One
	? [N, Zero]
	: Subtract<N, M> extends never
	? [Zero, N]
	: Divide<Subtract<N, M>, M> extends [
			infer Divisor extends Ordinal,
			infer Modulus extends Ordinal
	  ]
	? [Increment<Divisor>, Modulus]
	: never;
export type IntegerDivide<N extends Ordinal, M extends Ordinal> = Divide<
	N,
	M
>[0];
export type Modulo<N extends Ordinal, M extends Ordinal> = Divide<N, M>[1];
