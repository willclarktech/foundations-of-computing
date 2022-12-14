import type {
	BooleanValue,
	Halt,
	MoveLeft,
	MoveRight,
	Tape,
	TernaryValue,
	ThreeSymbolTape,
	TwoSymbolTape,
	Write,
} from "./lib";

// A 3-state, 2-symbol busy beaver program

type BusyBeaverA<T extends TwoSymbolTape> = T["current"] extends "1"
	? BusyBeaverC<MoveLeft<BooleanValue, T>>
	: BusyBeaverB<MoveRight<BooleanValue, Write<BooleanValue, T, "1">>>;
type BusyBeaverB<T extends TwoSymbolTape> = T["current"] extends "1"
	? BusyBeaverB<MoveRight<BooleanValue, T>>
	: BusyBeaverA<MoveLeft<BooleanValue, Write<BooleanValue, T, "1">>>;
type BusyBeaverC<T extends TwoSymbolTape> = T["current"] extends "1"
	? Halt<BooleanValue, MoveRight<BooleanValue, T>>
	: BusyBeaverB<MoveLeft<BooleanValue, Write<BooleanValue, T, "1">>>;

type BusyBeaverStart = { left: ""; current: "0"; right: "" };
export type BusyBeaverResult = BusyBeaverA<BusyBeaverStart>; // "111111"

// Wolfram 2-state, 3-symbol non-standard universal Turing machine

type WolframA<T extends ThreeSymbolTape> = T["current"] extends "2"
	? WolframA<MoveLeft<TernaryValue, Write<TernaryValue, T, "1">>>
	: T["current"] extends "1"
	? WolframA<MoveLeft<TernaryValue, Write<TernaryValue, T, "2">>>
	: WolframB<MoveRight<TernaryValue, Write<TernaryValue, T, "1">>>;
type WolframB<T extends ThreeSymbolTape> = T["current"] extends "2"
	? WolframA<MoveRight<TernaryValue, Write<TernaryValue, T, "0">>>
	: T["current"] extends "1"
	? WolframB<MoveRight<TernaryValue, Write<TernaryValue, T, "2">>>
	: WolframA<MoveLeft<TernaryValue, Write<TernaryValue, T, "2">>>;

type WolframStart = { left: ""; current: "0"; right: "" };
// export type WolframResult = WolframA<WolframStart>; // No halt state

// Rogozhin's 4-state, 6-symbol standard universal Turing machine

type RogozhinValue = "0" | "1" | "2" | "3" | "4" | "5";
type RogozhinTape = Tape<RogozhinValue>;

type RogozhinA<T extends RogozhinTape> = T["current"] extends "5"
	? RogozhinC<MoveRight<RogozhinValue, Write<RogozhinValue, T, "0">>>
	: T["current"] extends "4"
	? RogozhinA<MoveRight<RogozhinValue, Write<RogozhinValue, T, "0">>>
	: T["current"] extends "3"
	? RogozhinA<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "2">>>
	: T["current"] extends "2"
	? RogozhinA<MoveRight<RogozhinValue, Write<RogozhinValue, T, "3">>>
	: T["current"] extends "1"
	? RogozhinA<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "4">>>
	: RogozhinA<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "4">>>;

type RogozhinB<T extends RogozhinTape> = T["current"] extends "5"
	? RogozhinA<MoveRight<RogozhinValue, Write<RogozhinValue, T, "1">>>
	: T["current"] extends "4"
	? Halt<RogozhinValue, T>
	: T["current"] extends "3"
	? RogozhinB<MoveRight<RogozhinValue, Write<RogozhinValue, T, "2">>>
	: T["current"] extends "2"
	? RogozhinC<MoveRight<RogozhinValue, Write<RogozhinValue, T, "4">>>
	: T["current"] extends "1"
	? RogozhinB<MoveRight<RogozhinValue, Write<RogozhinValue, T, "1">>>
	: RogozhinA<MoveRight<RogozhinValue, Write<RogozhinValue, T, "5">>>;

type RogozhinC<T extends RogozhinTape> = T["current"] extends "5"
	? RogozhinC<MoveRight<RogozhinValue, Write<RogozhinValue, T, "2">>>
	: T["current"] extends "4"
	? Halt<RogozhinValue, T>
	: T["current"] extends "3"
	? RogozhinC<MoveRight<RogozhinValue, Write<RogozhinValue, T, "4">>>
	: T["current"] extends "2"
	? RogozhinD<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "5">>>
	: T["current"] extends "1"
	? RogozhinC<MoveRight<RogozhinValue, Write<RogozhinValue, T, "0">>>
	: RogozhinD<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "5">>>;

type RogozhinD<T extends RogozhinTape> = T["current"] extends "5"
	? RogozhinD<MoveRight<RogozhinValue, Write<RogozhinValue, T, "2">>>
	: T["current"] extends "4"
	? RogozhinD<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "3">>>
	: T["current"] extends "3"
	? RogozhinD<MoveRight<RogozhinValue, Write<RogozhinValue, T, "4">>>
	: T["current"] extends "2"
	? RogozhinB<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "3">>>
	: T["current"] extends "1"
	? RogozhinD<MoveRight<RogozhinValue, Write<RogozhinValue, T, "0">>>
	: RogozhinD<MoveLeft<RogozhinValue, Write<RogozhinValue, T, "1">>>;

type RogozhinStart = { left: "5515"; current: "0"; right: "" };
// type RogozhinResult = RogozhinC<RogozhinStart>; // Apparently too deep for TS server
