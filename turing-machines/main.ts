#!/usr/bin/env ts-node
import { Card, Machine } from "./lib";

const cards = [
	new Card(
		{ write: 1, move: 1, nextCard: 2 },
		{ write: 1, move: 0, nextCard: 2 }
	),
	new Card(
		{ write: 1, move: 0, nextCard: 1 },
		{ write: 1, move: 1, nextCard: 0 }
	),
];

const machine = new Machine(cards);

console.log("CARDS: ", cards);
console.log("================================");
const score = machine.execute();
console.log("================================");
console.log("SCORE:", score);
