/**
 * Von Neumann ordinals
 *
 * Note that not all instances of the Ordinal type are valid Von Neumann ordinals in this encoding but successively incrementing from Zero will result in valid ordinals.
 * 0: {}
 * 1: {{}}
 * 2: {{}, {{}}}
 * 3: {{}, {{}}, {{}, {{}}}}
 */

type Zero = [];
type Ordinal = Zero | Ordinal[];

type Decode<N extends Ordinal> = N["length"];

type Increment<N extends Ordinal> = [...N, N];
type Decrement<N extends Ordinal> = N extends [
	...infer M extends Ordinal,
	unknown
]
	? M
	: never;

type One = Increment<Zero>;
type Two = Increment<One>;
type Three = Increment<Two>;
type TwoAgain = Decrement<Three>;
type OneAgain = Decrement<TwoAgain>;
type ZeroAgain = Decrement<OneAgain>;
type NotAnOrdinal = Decrement<ZeroAgain>;

type Add<N extends Ordinal, M extends Ordinal> = M extends Zero
	? N
	: Add<Increment<N>, Decrement<M>>;
type Subtract<N extends Ordinal, M extends Ordinal> = M extends Zero
	? N
	: Subtract<Decrement<N>, Decrement<M>>;
type Multiply<N extends Ordinal, M extends Ordinal> = M extends Zero
	? Zero
	: Add<N, Multiply<N, Decrement<M>>>;

/** Calculates a tuple of [integer division, modulus] */
type Divide<N extends Ordinal, M extends Ordinal> = M extends Zero
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
type IntegerDivide<N extends Ordinal, M extends Ordinal> = Divide<N, M>[0];
type Modulo<N extends Ordinal, M extends Ordinal> = Divide<N, M>[1];

type Test1a = Decode<IntegerDivide<Three, Zero>>;
type Test1b = Decode<Modulo<Three, Zero>>;
type Test2a = Decode<IntegerDivide<Three, One>>;
type Test2b = Decode<Modulo<Three, One>>;
type Test3a = Decode<IntegerDivide<Three, Two>>;
type Test3b = Decode<Modulo<Three, Two>>;
type Test4 = Decode<Multiply<Two, Add<Three, One>>>;
