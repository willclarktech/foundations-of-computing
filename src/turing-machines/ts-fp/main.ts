import type { Tape, ThreeSymbolTape, TwoSymbolTape } from "./lib";
import { halt, moveLeft, moveRight, write } from "./lib";

// A 3-state, 2-symbol busy beaver program

const busyBeaverA = (tape: TwoSymbolTape): string => {
	switch (tape.current) {
		case "1":
			return busyBeaverC(moveLeft(tape));
		case "0":
			return busyBeaverB(moveRight(write(tape, "1")));
	}
};
const busyBeaverB = (tape: TwoSymbolTape): string => {
	switch (tape.current) {
		case "1":
			return busyBeaverB(moveRight(tape));
		case "0":
			return busyBeaverA(moveLeft(write(tape, "1")));
	}
};
const busyBeaverC = (tape: TwoSymbolTape): string => {
	switch (tape.current) {
		case "1":
			return halt(moveRight(tape));
		case "0":
			return busyBeaverB(moveLeft(write(tape, "1")));
	}
};

const busyBeaverStart: TwoSymbolTape = { left: [], current: "0", right: [] };
const busyBeaverResult = busyBeaverA(busyBeaverStart); // "111111"
console.log(`Busy beaver result: ${busyBeaverResult}`);

// wolfram 2-state, 3-symbol non-standard universal Turing machine

const wolframA = (tape: ThreeSymbolTape): string => {
	switch (tape.current) {
		case "2":
			return wolframA(moveLeft(write(tape, "1")));
		case "1":
			return wolframA(moveLeft(write(tape, "2")));
		case "0":
			return wolframB(moveRight(write(tape, "1")));
	}
};

const wolframB = (tape: ThreeSymbolTape): string => {
	switch (tape.current) {
		case "2":
			return wolframA(moveRight(write(tape, "0")));
		case "1":
			return wolframB(moveRight(write(tape, "2")));
		case "0":
			return wolframA(moveLeft(write(tape, "2")));
	}
};

const wolframStart: ThreeSymbolTape = { left: [], current: "0", right: [] };
// const wolframResult = wolframA(wolframStart); // No halt state
// console.log(`Wolfram result: ${wolframResult}`);

// Rogozhin's 4-state, 6-symbol standard universal Turing machine

type RogozhinValue = "0" | "1" | "2" | "3" | "4" | "5";
type RogozhinTape = Tape<RogozhinValue>;

const rogozhinA = (tape: RogozhinTape): string => {
	switch (tape.current) {
		case "5":
			return rogozhinC(moveLeft(write(tape, "0")));
		case "4":
			return rogozhinA(moveLeft(write(tape, "0")));
		case "3":
			return rogozhinA(moveRight(write(tape, "2")));
		case "2":
			return rogozhinA(moveLeft(write(tape, "3")));
		case "1":
			return rogozhinA(moveRight(write(tape, "4")));
		case "0":
			return rogozhinA(moveRight(write(tape, "4")));
	}
};
const rogozhinB = (tape: RogozhinTape): string => {
	switch (tape.current) {
		case "5":
			return rogozhinA(moveLeft(write(tape, "1")));
		case "4":
			return halt(tape);
		case "3":
			return rogozhinB(moveLeft(write(tape, "2")));
		case "2":
			return rogozhinC(moveLeft(write(tape, "4")));
		case "1":
			return rogozhinB(moveLeft(write(tape, "1")));
		case "0":
			return rogozhinA(moveLeft(write(tape, "5")));
	}
};

const rogozhinC = (tape: RogozhinTape): string => {
	switch (tape.current) {
		case "5":
			return rogozhinC(moveLeft(write(tape, "2")));
		case "4":
			return halt(tape);
		case "3":
			return rogozhinC(moveLeft(write(tape, "4")));
		case "2":
			return rogozhinD(moveRight(write(tape, "5")));
		case "1":
			return rogozhinC(moveLeft(write(tape, "0")));
		case "0":
			return rogozhinD(moveRight(write(tape, "5")));
	}
};

const rogozhinD = (tape: RogozhinTape): string => {
	switch (tape.current) {
		case "5":
			return rogozhinD(moveLeft(write(tape, "2")));
		case "4":
			return rogozhinD(moveRight(write(tape, "3")));
		case "3":
			return rogozhinD(moveLeft(write(tape, "4")));
		case "2":
			return rogozhinB(moveRight(write(tape, "3")));
		case "1":
			return rogozhinD(moveLeft(write(tape, "0")));
		case "0":
			return rogozhinD(moveRight(write(tape, "1")));
	}
};

const rogozhinStart: RogozhinTape = {
	left: ["5", "5", "1", "5"],
	current: "0",
	right: [],
};
const rogozhinResult = rogozhinC(rogozhinStart); // 04222444444
console.log(`Rogozhin result: ${rogozhinResult}`);
