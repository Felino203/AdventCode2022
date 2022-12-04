import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split("\r\n");
	return data.map((line) => {
		return line.split(",").map((elf) => {
			return elf.split("-").map((num) => parseInt(num));
		});
	});
}

async function part1() {
	let input = await readFile("./Day4/input.txt");
	const data = parseInput(input);
	const overlapList = data.filter((line) => {
		const overlaps =
			(line[0][0] >= line[1][0] && line[0][1] <= line[1][1]) ||
			(line[0][0] <= line[1][0] && line[0][1] >= line[1][1]);
		return overlaps;
	});
	console.log(overlapList.length);
}

part1();
