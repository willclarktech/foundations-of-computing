#!/usr/bin/env ts-node

import {
	add,
	apply,
	decodeBoolean,
	decodeOrdinal,
	f,
	integerDivide,
	modulo,
	multiply,
	nand,
	not,
	one,
	simpleNot,
	t,
	three,
	two,
	zero,
} from "./lib";

const main = (): void => {
	console.table([
		// { test: "3 // 0", answer: decodeOrdinal(integerDivide(three, zero)) }, // throws
		// { test: "3 % 0", answer: decodeOrdinal(modulo(three, zero)) }, // throws
		{ test: "3 // 1", answer: decodeOrdinal(integerDivide(three, one)) },
		{ test: "3 % 1", answer: decodeOrdinal(modulo(three, one)) },
		{ test: "3 // 2", answer: decodeOrdinal(integerDivide(three, two)) },
		{ test: "3 % 2", answer: decodeOrdinal(modulo(three, two)) },
		{
			test: "2 * (3 + 1)",
			answer: decodeOrdinal(multiply(two, add(three, one))),
		},
	]);

	console.table([
		{ test: "simpleNot true", answer: decodeBoolean(apply(simpleNot, t)) },
		{ test: "simpleNot false", answer: decodeBoolean(apply(simpleNot, f)) },
		{ test: "true nand true", answer: decodeBoolean(apply(apply(nand, t), t)) },
		{
			test: "true nand false",
			answer: decodeBoolean(apply(apply(nand, t), f)),
		},
		{
			test: "false nand true",
			answer: decodeBoolean(apply(apply(nand, f), t)),
		},
		{
			test: "false nand false",
			answer: decodeBoolean(apply(apply(nand, f), f)),
		},
		{ test: "not true", answer: decodeBoolean(not(t)) },
		{ test: "not false", answer: decodeBoolean(not(f)) },
	]);
};

main();
