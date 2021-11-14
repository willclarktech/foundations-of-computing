// BCKW

/** Composition: \fga.f(ga) */
const B = (x) => (y) => (z) => x(y(z));
/** Swap arguments: \fab.fba */
const C = (x) => (y) => (z) => x(z)(y);
/** Discard second argument: \ab.a */
const K = (x) => (_) => x;
/** Duplicate second argument: \ab.abb */
const W = (x) => (y) => x(y)(y);

// Useful combinators

/** Identity: \a.a */
const I = W(K);

// Terminal object

/** Terminal object: \xy.x */
const CONST = K;

// Booleans

/** \xy.x */
const TRUE = K;
/** \xy.y */
const FALSE = C(K); // = K(I)

/** \pab.pba */
const NOT = C;
/** \pq.pqp */
const AND = W(C);
/** \pq.ppq = \p.pp */
const OR = W(I);
/** \pq.pqT */
const ONLY_IF = C(C)(K);

// Numerals

/** \fx.x */
const ZERO = FALSE;
/** Add one: \nfx.f(nfx) */
const SUCC = B(W)(B(C(B)));
/** \fx.fx */
const ONE = SUCC(ZERO); // = I
/** \fx.f(fx) */
const TWO = SUCC(ONE);
/** \fx.f(f(fx)) */
const THREE = SUCC(TWO);
/** \fx.f(f(f(fx))) */
const FOUR = SUCC(THREE);

/** \mnfx.mf(nfx) */
const ADD = C(I)(SUCC);
/** \mnfx.m(nf)x */
const MUL = B;
/** \mnfx.(nm)fx */
const POW = C(I);

module.exports = {
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
};
