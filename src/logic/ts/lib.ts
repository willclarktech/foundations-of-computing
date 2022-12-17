// Axiomatic
export const nand = (a: boolean, b: boolean): boolean => !(a && b);

export const not = (a: boolean): boolean => nand(a, a);

export const and = (a: boolean, b: boolean): boolean => {
	const aNandB = nand(a, b);
	return nand(aNandB, aNandB);
};

export const or = (a: boolean, b: boolean): boolean =>
	nand(nand(a, a), nand(b, b));

export const onlyIf = (a: boolean, b: boolean): boolean => nand(a, nand(a, b));

export const xor = (a: boolean, b: boolean): boolean => {
	const aNandB = nand(a, b);
	return nand(nand(a, aNandB), nand(b, aNandB));
};

export const nor = (a: boolean, b: boolean): boolean => {
	const aOrB = nand(nand(a, a), nand(b, b));
	return nand(aOrB, aOrB);
};

// Alternatively just start with NOR, which is equivalent:
export const nandFromNor = (a: boolean, b: boolean): boolean => {
	const aAndB = nor(nor(a, a), nor(b, b));
	return nor(aAndB, aAndB);
};
