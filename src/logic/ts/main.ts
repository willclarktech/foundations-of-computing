#!/usr/bin/env ts-node
import { and, nand, nandFromNor, nor, not, onlyIf, or, xor } from "./lib";

const logUnaryOperator = (f: (a: boolean) => boolean): void =>
	console.table([
		[f.name, true, false],
		[null, f(true), f(false)],
	]);

const logBinaryOperator = (f: (a: boolean, b: boolean) => boolean): void =>
	console.table([
		[f.name, true, false],
		[true, f(true, true), f(false, true)],
		[false, f(true, false), f(false, false)],
	]);

const main = (): void => {
	logBinaryOperator(nand);
	logUnaryOperator(not);
	logBinaryOperator(and);
	logBinaryOperator(or);
	logBinaryOperator(onlyIf);
	logBinaryOperator(xor);
	logBinaryOperator(nor);
	logBinaryOperator(nandFromNor);
};

main();
