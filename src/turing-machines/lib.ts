const GREEN = "\u001b[32m";
const RESET = "\u001b[0m";

export type Bool = 0 | 1;

export interface Flags {
	readonly write: Bool;
	readonly move: Bool;
	readonly nextCard: number;
}

export class Card {
	private readonly flags0: Flags;
	private readonly flags1: Flags;

	/** Creates Card 0 */
	public static halt(): Card {
		const defaultFlags: Flags = { write: 0, move: 0, nextCard: 0 };
		return new Card(defaultFlags, defaultFlags);
	}

	public constructor(flags0: Flags, flags1: Flags) {
		this.flags0 = flags0;
		this.flags1 = flags1;
	}

	public flags(value: Bool): Flags {
		return value ? this.flags1 : this.flags0;
	}
}

export class Tape {
	private location: number;
	private values: readonly Bool[];

	public constructor() {
		this.location = 0;
		this.values = [0];
	}

	public toString(): string {
		return this.values.reduce(
			(str, value, i) =>
				i === this.location
					? `${str}${GREEN}${value}${RESET}`
					: `${str}${value}`,
			""
		);
	}

	public read(): Bool {
		return this.values[this.location];
	}

	public write(value: Bool): void {
		this.values = [
			...this.values.slice(0, this.location),
			value,
			...this.values.slice(this.location + 1),
		];
	}

	public move(direction: Bool): void {
		switch (direction) {
			// Left
			case 0: {
				if (this.location === 0) {
					this.values = [0, ...this.values];
				} else {
					--this.location;
				}
				break;
			}
			// Right
			case 1: {
				++this.location;
				if (this.location >= this.values.length) {
					this.values = [...this.values, 0];
				}
				break;
			}
			default:
				throw new Error("Invalid direction");
		}
	}

	public sum(): number {
		return this.values.reduce<number>((total, n) => total + n, 0);
	}
}

export class Machine {
	private readonly tape: Tape;
	private readonly cards: readonly Card[];
	private cardIndex: number;

	public constructor(cards: readonly Card[]) {
		this.tape = new Tape();
		this.cards = [Card.halt(), ...cards];
		this.cardIndex = 1;
	}

	private log(step: number): void {
		console.log(`Step ${step} - Card ${this.cardIndex}: ${this.tape}`);
	}

	private executeStep(): void {
		if (this.cardIndex < 1) {
			throw new Error("Machine is halted");
		}
		if (this.cardIndex >= this.cards.length) {
			throw new Error("Invalid card number");
		}
		const value = this.tape.read();
		const { write, move, nextCard } = this.cards[this.cardIndex].flags(value);
		this.tape.write(write);
		this.tape.move(move);
		this.cardIndex = nextCard;
	}

	public execute(): number {
		let step = 0;

		while (this.cardIndex !== 0) {
			this.log(step);
			this.executeStep();
			++step;
		}
		this.log(step);

		return this.tape.sum();
	}
}
