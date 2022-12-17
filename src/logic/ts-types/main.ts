import { And, Nand, NandFromNor, Nor, Not, OnlyIf, Or, Xor } from "./lib";

type Nand1 = Nand<true, true>;
type Nand2 = Nand<true, false>;
type Nand3 = Nand<false, true>;
type Nand4 = Nand<false, false>;

type Not1 = Not<true>;
type Not2 = Not<false>;

type And1 = And<true, true>;
type And2 = And<true, false>;
type And3 = And<false, true>;
type And4 = And<false, false>;

type Or1 = Or<true, true>;
type Or2 = Or<true, false>;
type Or3 = Or<false, true>;
type Or4 = Or<false, false>;

type OnlyIf1 = OnlyIf<true, true>;
type OnlyIf2 = OnlyIf<true, false>;
type OnlyIf3 = OnlyIf<false, true>;
type OnlyIf4 = OnlyIf<false, false>;

type Xor1 = Xor<true, true>;
type Xor2 = Xor<true, false>;
type Xor3 = Xor<false, true>;
type Xor4 = Xor<false, false>;

type Nor1 = Nor<true, true>;
type Nor2 = Nor<true, false>;
type Nor3 = Nor<false, true>;
type Nor4 = Nor<false, false>;

type NandFromNor1 = NandFromNor<true, true>;
type NandFromNor2 = NandFromNor<true, false>;
type NandFromNor3 = NandFromNor<false, true>;
type NandFromNor4 = NandFromNor<false, false>;
