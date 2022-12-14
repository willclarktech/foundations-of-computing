/**
 * Inspired by https://gist.github.com/hediet/63f4844acf5ac330804801084f87a6d4?permalink_comment_id=3777470#gistcomment-3777470
 */

// Basic data types

export type Tape<Value extends string> = {
	left: string;
	current: Value;
	right: string;
};

export type BooleanValue = "0" | "1";
export type TwoSymbolTape = Tape<BooleanValue>;

export type TernaryValue = "0" | "1" | "2";
export type ThreeSymbolTape = Tape<TernaryValue>;

// String helper types

export type First<
	Value extends string,
	S extends string
> = S extends `${infer U extends Value}${string}`
	? U
	: // Uninitialized tape values default to 0
	  "0";
export type RemoveFirst<
	Value extends string,
	S extends string
> = S extends `${Value}${infer U}` ? U : "";
export type Reverse<Value extends string, S extends string> = S extends ""
	? S
	: `${Reverse<Value, RemoveFirst<Value, S>>}${First<Value, S>}`;

// Operations

/** Move the tape left (not the head) */
export type MoveLeft<Value extends string, T extends Tape<Value>> = {
	// Left side of the tape is represented backwards to reduce reverse calculations (reversed once when halted to read output)
	left: `${T["current"]}${T["left"]}`;
	current: First<Value, T["right"]>;
	right: RemoveFirst<Value, T["right"]>;
};
/** Move the tape right (not the head) */
export type MoveRight<Value extends string, T extends Tape<Value>> = {
	left: RemoveFirst<Value, T["left"]>;
	current: First<Value, T["left"]>;
	right: `${T["current"]}${T["right"]}`;
};
export type Write<
	Value extends string,
	T extends Tape<Value>,
	V extends Value
> = {
	left: T["left"];
	current: V;
	right: T["right"];
};
export type Halt<Value extends string, T extends Tape<Value>> = `${Reverse<
	Value,
	T["left"]
>}${T["current"]}${T["right"]}`;
