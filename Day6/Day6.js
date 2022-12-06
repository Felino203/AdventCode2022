import readFile from "../utils/readFiles.js";

function hasRepeatingChar(string) {
	const chars = {};
	for (const char of string) {
		if (chars[char]) return true;
		chars[char] = true;
	}
	return false;
}

async function part1() {
	const dataStream = await readFile("./Day6/input.txt");
	console.log(dataStream);
	let searchValue = { value: 0, index: 0 };
	for (let i = 4; i < dataStream.length; i++) {
		if (!hasRepeatingChar(dataStream.slice(i - 4, i))) {
			searchValue = { value: dataStream.slice(i - 4, i), index: i };
			break;
		}
	}
	console.log(searchValue);
}

async function part2() {
	const dataStream = await readFile("./Day6/input.txt");
	console.log(dataStream);
	let searchValue = { value: 0, index: 0 };
	for (let i = 14; i < dataStream.length; i++) {
		if (!hasRepeatingChar(dataStream.slice(i - 14, i))) {
			searchValue = { value: dataStream.slice(i - 14, i), index: i };
			break;
		}
	}
	console.log(searchValue);
}

part2();
