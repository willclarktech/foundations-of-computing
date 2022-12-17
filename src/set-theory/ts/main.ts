#!/usr/bin/env ts-node

import {
	add,
	decode,
	integerDivide,
	modulo,
	multiply,
	one,
	three,
	two,
	zero,
} from "./lib";

const main = (): void => {
	console.table([
		// { test: "3 // 0", answer: decode(integerDivide(three, zero)) }, // throws
		// { test: "3 % 0", answer: decode(modulo(three, zero)) }, // throws
		{ test: "3 // 1", answer: decode(integerDivide(three, one)) },
		{ test: "3 % 1", answer: decode(modulo(three, one)) },
		{ test: "3 // 2", answer: decode(integerDivide(three, two)) },
		{ test: "3 % 2", answer: decode(modulo(three, two)) },
		{ test: "2 * (3 + 1)", answer: decode(multiply(two, add(three, one))) },
	]);
};

main();
