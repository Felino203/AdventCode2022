import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split(" \r\n\r\n");
	const stack = data[0];
	const instructions = data[1].split("\r\n").map((line) => {
		const instruction = line.split(" ");
		return {
			quantity: parseInt(instruction[1]),
			previous: parseInt(instruction[3]),
			next: parseInt(instruction[5]),
		};
	});
	return {
		instructions: instructions,
		stack: data[0],
	};
}

function initStack(input) {
	const stacks = [];
	const stackQty = parseInt(input.charAt(input.length - 1));
	for (let i = 1; i <= stackQty; i++) {
		stacks.push([]);
	}
	const regex = /[A-Z]/g;
	const lineLength = input.split("\r\n")[0].length;
	let index = 0;
	for (const char of input) {
		if (char === "1") break;
		if (regex.test(char)) {
			stacks[(index - 1) / ((lineLength + 1) / stackQty)].unshift(char);
		}
		index++;
		if (char === "\n") index = 0;
	}
	return stacks;
}

function modifyStack1(stacks, { quantity, previous, next }) {
	for (let i = 0; i < quantity; i++) {
		const boxChar = stacks[previous - 1].pop();
		stacks[next - 1].push(boxChar);
	}
}

function modifyStack2(stacks, { quantity, previous, next }) {
	const boxGroup = stacks[previous - 1].splice(
		stacks[previous - 1].length - quantity,
		quantity
	);
	stacks[next - 1] = stacks[next - 1].concat(boxGroup);
}

async function part1() {
	let input = await readFile("./Day5/input.txt");
	const { instructions, stack } = parseInput(input);
	const stacks = initStack(stack);
	for (const instruction of instructions) {
		modifyStack1(stacks, instruction);
	}
	console.log(
		stacks
			.map((stack) => {
				return stack.pop();
			})
			.join("")
	);
}

async function part2() {
	let input = await readFile("./Day5/input.txt");
	const { instructions, stack } = parseInput(input);
	const stacks = initStack(stack);
	for (const instruction of instructions) {
		modifyStack2(stacks, instruction);
	}
	console.log(
		stacks
			.map((stack) => {
				return stack.pop();
			})
			.join("")
	);
}

part2();
