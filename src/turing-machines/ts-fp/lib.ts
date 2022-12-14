/**
 * Inspired by https://gist.github.com/hediet/63f4844acf5ac330804801084f87a6d4?permalink_comment_id=3777470#gistcomment-3777470
 */

// Basic data types

export type Tape<Value extends string> = {
	left: readonly Value[];
	current: Value;
	right: readonly Value[];
};

export type BooleanValue = "0" | "1";
export type TwoSymbolTape = Tape<BooleanValue>;

export type TernaryValue = "0" | "1" | "2";
export type ThreeSymbolTape = Tape<TernaryValue>;

// Operations

/** Move the tape left (not the head) */
export const moveLeft = <Value extends string>({
	left,
	current,
	right: [head, ...tail],
}: Tape<Value>): Tape<Value> => ({
	// Left side of the tape is represented backwards to reduce reverse calculations (reversed once when halted to read output)
	left: [current, ...left],
	current: head ?? "0", // Uninitialized values default to 0
	right: tail,
});
/** Move the tape right (not the head) */
export const moveRight = <Value extends string>({
	left: [head, ...tail],
	current,
	right,
}: Tape<Value>): Tape<Value> => ({
	left: tail,
	current: head ?? "0", // Uninitialized values default to 0
	right: [current, ...right],
});

export const write = <Value extends string>(
	tape: Tape<Value>,
	value: Value
): Tape<Value> => ({
	...tape,
	current: value,
});

export const halt = <Value extends string>({
	left,
	current,
	right,
}: Tape<Value>): string =>
	`${[...left].reverse().join("")}${current}${right.join("")}`;
