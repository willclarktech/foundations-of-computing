import type {
	Add,
	Decode,
	IntegerDivide,
	Modulo,
	Multiply,
	One,
	Three,
	Two,
	Zero,
} from "./lib";

type Test1a = Decode<IntegerDivide<Three, Zero>>;
type Test1b = Decode<Modulo<Three, Zero>>;
type Test2a = Decode<IntegerDivide<Three, One>>;
type Test2b = Decode<Modulo<Three, One>>;
type Test3a = Decode<IntegerDivide<Three, Two>>;
type Test3b = Decode<Modulo<Three, Two>>;
type Test4 = Decode<Multiply<Two, Add<Three, One>>>;
