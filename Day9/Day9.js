import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split("\r\n");
	return data.map((line) => {
		return {
			direction: line.split(" ")[0],
			steps: parseInt(line.split(" ")[1]),
		};
	});
}

function moveHead(headCoords, instruction) {
	switch (instruction.direction) {
		case "R":
			headCoords.x++;
			break;
		case "L":
			headCoords.x--;
			break;
		case "U":
			headCoords.y++;
			break;
		case "D":
			headCoords.y--;
			break;
	}
}

function tailFollowHead(tailCoords, headCoords, visitedCoords) {
	if (isTouchingHead(tailCoords, headCoords)) {
		return;
	}
	const distanceVector = {
		x: headCoords.x - tailCoords.x,
		y: headCoords.y - tailCoords.y,
	};
	const moveVector = {
		x:
			Math.abs(distanceVector.x) > 1
				? distanceVector.x -
				  distanceVector.x / Math.abs(distanceVector.x)
				: distanceVector.x,
		y:
			Math.abs(distanceVector.y) > 1
				? distanceVector.y -
				  distanceVector.y / Math.abs(distanceVector.y)
				: distanceVector.y,
	};
	tailCoords.x += moveVector.x;
	tailCoords.y += moveVector.y;
	if (
		!visitedCoords.some(
			(coords) => coords.x === tailCoords.x && coords.y === tailCoords.y
		)
	) {
		visitedCoords.push({ ...tailCoords });
	}
}

function isTouchingHead(tailCoords, headCoords) {
	const isTouchingColumn = Math.abs(headCoords.x - tailCoords.x) <= 1;
	const isTouchingRow = Math.abs(headCoords.y - tailCoords.y) <= 1;
	return isTouchingColumn && isTouchingRow;
}

async function part1() {
	let input = await readFile("./Day9/input.txt");
	const instructions = parseInput(input);
	const tailCoords = { x: 0, y: 0 };
	const headCoords = { x: 0, y: 0 };
	const visitedCoords = [{ ...tailCoords }];
	for (const instruction of instructions) {
		for (let i = 0; i < instruction.steps; i++) {
			moveHead(headCoords, instruction);
			tailFollowHead(tailCoords, headCoords, visitedCoords);
		}
	}
	console.log(visitedCoords.length);
}

part1();
