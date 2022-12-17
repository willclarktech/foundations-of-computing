// Axiomatic
export type Nand<A extends boolean, B extends boolean> = A extends true
	? B extends true
		? false
		: true
	: true;

export type Not<A extends boolean> = Nand<A, A>;

export type And<A extends boolean, B extends boolean> = Nand<
	Nand<A, B>,
	Nand<A, B>
>;

export type Or<A extends boolean, B extends boolean> = Nand<
	Nand<A, A>,
	Nand<B, B>
>;

export type OnlyIf<A extends boolean, B extends boolean> = Nand<A, Nand<A, B>>;

export type Xor<A extends boolean, B extends boolean> = Nand<
	Nand<A, Nand<A, B>>,
	Nand<B, Nand<A, B>>
>;

export type Nor<A extends boolean, B extends boolean> = Nand<
	Nand<Nand<A, A>, Nand<B, B>>,
	Nand<Nand<A, A>, Nand<B, B>>
>;

// // Alternatively just start with NOR, which is equivalent:
export type NandFromNor<A extends boolean, B extends boolean> = Nor<
	Nor<Nor<A, A>, Nor<B, B>>,
	Nor<Nor<A, A>, Nor<B, B>>
>;
