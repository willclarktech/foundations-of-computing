#!/usr/bin/env ts-node
import {
	B,
	C,
	K,
	W,
	I,
	CONST,
	TRUE,
	FALSE,
	NOT,
	AND,
	OR,
	ONLY_IF,
	ZERO,
	SUCC,
	ONE,
	TWO,
	THREE,
	FOUR,
	ADD,
	MUL,
	POW,
} from "./lib";
import { lambdaToBool, lambdaToNumeral } from "./util";

console.log("TRUTH TABLE: NOT");
console.log(true, lambdaToBool(NOT(TRUE)));
console.log(false, lambdaToBool(NOT(FALSE)));

console.log("TRUTH TABLE: OR");
console.log(true, true, lambdaToBool(OR(TRUE)(TRUE)));
console.log(true, false, lambdaToBool(OR(TRUE)(FALSE)));
console.log(false, true, lambdaToBool(OR(FALSE)(TRUE)));
console.log(false, false, lambdaToBool(OR(FALSE)(FALSE)));

console.log("TRUTH TABLE: AND");
console.log(true, true, lambdaToBool(AND(TRUE)(TRUE)));
console.log(true, false, lambdaToBool(AND(TRUE)(FALSE)));
console.log(false, true, lambdaToBool(AND(FALSE)(TRUE)));
console.log(false, false, lambdaToBool(AND(FALSE)(FALSE)));

console.log("TRUTH TABLE: ONLY IF");
console.log(true, true, lambdaToBool(ONLY_IF(TRUE)(TRUE)));
console.log(true, false, lambdaToBool(ONLY_IF(TRUE)(FALSE)));
console.log(false, true, lambdaToBool(ONLY_IF(FALSE)(TRUE)));
console.log(false, false, lambdaToBool(ONLY_IF(FALSE)(FALSE)));

console.log("NUMERALS");
console.log(lambdaToNumeral(ZERO));
console.log(lambdaToNumeral(ONE));
console.log(lambdaToNumeral(TWO));
console.log(lambdaToNumeral(THREE));
console.log(lambdaToNumeral(FOUR));

console.log("ADD");
console.log(1, 2, lambdaToNumeral(ADD(ONE)(TWO)));
console.log(2, 1, lambdaToNumeral(ADD(TWO)(ONE)));
console.log(2, 3, lambdaToNumeral(ADD(TWO)(THREE)));
console.log(4, 3, lambdaToNumeral(ADD(FOUR)(THREE)));

console.log("MUL");
console.log(1, 2, lambdaToNumeral(MUL(ONE)(TWO)));
console.log(2, 1, lambdaToNumeral(MUL(TWO)(ONE)));
console.log(2, 3, lambdaToNumeral(MUL(TWO)(THREE)));
console.log(4, 3, lambdaToNumeral(MUL(FOUR)(THREE)));

console.log("POW");
console.log(1, 2, lambdaToNumeral(POW(ONE)(TWO)));
console.log(2, 1, lambdaToNumeral(POW(TWO)(ONE)));
console.log(2, 3, lambdaToNumeral(POW(TWO)(THREE)));
console.log(4, 3, lambdaToNumeral(POW(FOUR)(THREE)));

console.log("MATH");
console.log(
	"(((2+4)^3)*3)+(1*4)",
	(2 + 4) ** 3 * 3 + 1 * 4,
	lambdaToNumeral(ADD(MUL(POW(ADD(TWO)(FOUR))(THREE))(THREE))(MUL(ONE)(FOUR)))
);
