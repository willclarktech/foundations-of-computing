const lambdaToBool = (f) => f(true)(false).toString();
const lambdaToNumeral = (n) => n((k) => k + 1)(0);

module.exports = {
	lambdaToBool,
	lambdaToNumeral,
};
