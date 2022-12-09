import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split("\r\n");
	return data;
}

async function part1() {
	let input = await readFile("./DayX/input.txt");
	const data = parseInput(input);
	console.log(data);
}

part1();
