// BCKW

export type Combinator = (combinator: Combinator) => Combinator;

/** Composition: \fga.f(ga) */
export const B: Combinator = (x) => (y) => (z) => x(y(z));
/** Swap arguments: \fab.fba */
export const C: Combinator = (x) => (y) => (z) => x(z)(y);
/** Discard second argument: \ab.a */
export const K: Combinator = (x) => (_) => x;
/** Duplicate second argument: \ab.abb */
export const W: Combinator = (x) => (y) => x(y)(y);

// Useful combinators

/** Identity: \a.a */
export const I: Combinator = W(K);

// Terminal object

/** Terminal object: \xy.x */
export const CONST: Combinator = K;

// Booleans

/** \xy.x */
export const TRUE: Combinator = K;
/** \xy.y */
export const FALSE: Combinator = C(K); // = K(I)

/** \pab.pba */
export const NOT: Combinator = C;
/** \pq.pqp */
export const AND: Combinator = W(C);
/** \pq.ppq = \p.pp */
export const OR: Combinator = W(I);
/** \pq.pqT */
export const ONLY_IF: Combinator = C(C)(K);

// Numerals

/** \fx.x */
export const ZERO: Combinator = FALSE;
/** Add one: \nfx.f(nfx) */
export const SUCC: Combinator = B(W)(B(C(B)));
/** \fx.fx */
export const ONE: Combinator = SUCC(ZERO); // = I
/** \fx.f(fx) */
export const TWO: Combinator = SUCC(ONE);
/** \fx.f(f(fx)) */
export const THREE: Combinator = SUCC(TWO);
/** \fx.f(f(f(fx))) */
export const FOUR: Combinator = SUCC(THREE);

/** \mnfx.mf(nfx) */
export const ADD: Combinator = C(I)(SUCC);
/** \mnfx.m(nf)x */
export const MUL: Combinator = B;
/** \mnfx.(nm)fx */
export const POW: Combinator = C(I);
