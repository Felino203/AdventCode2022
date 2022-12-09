import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split("\r\n");
	return data;
}

function createMatrix(input) {
	const matrix = [];
	for (const line of input) {
		let row = "";
		for (const char of line) {
			row = row + "0";
		}
		matrix.push(row);
	}
	return matrix;
}

function replaceChar(origString, index, replaceChar) {
	let firstPart = origString.substr(0, index);
	let lastPart = origString.substr(index + 1);
	return firstPart + replaceChar + lastPart;
}

function castRay(
	horizontalIndex,
	verticalIndex,
	ray,
	treeMatrix,
	visibilityMatrix
) {
	let maxIndex;
	if (ray.direction === "horizontal") {
		maxIndex = treeMatrix[0].length;
	} else if (ray.direction === "vertical") {
		maxIndex = treeMatrix.length;
	}
	let visibilityHeight = -1;
	while (
		0 <= horizontalIndex &&
		horizontalIndex < maxIndex &&
		0 <= verticalIndex &&
		verticalIndex < maxIndex
	) {
		const currentTreeHeight = parseInt(
			treeMatrix[verticalIndex][horizontalIndex]
		);
		if (currentTreeHeight > visibilityHeight) {
			visibilityMatrix[verticalIndex] = replaceChar(
				visibilityMatrix[verticalIndex],
				horizontalIndex,
				"1"
			);
			visibilityHeight = currentTreeHeight;
		}
		if (ray.direction === "horizontal") {
			horizontalIndex += ray.increment;
		} else if (ray.direction === "vertical") {
			verticalIndex += ray.increment;
		}
	}
}

async function part1() {
	let input = await readFile("./Day8/input.txt");
	const treeMatrix = parseInput(input);
	const visibilityMatrix = createMatrix(treeMatrix);
	for (let i = 0; i < treeMatrix[0].length; i++) {
		castRay(
			i,
			0,
			{ direction: "vertical", increment: 1 },
			treeMatrix,
			visibilityMatrix
		);
		castRay(
			i,
			treeMatrix.length - 1,
			{ direction: "vertical", increment: -1 },
			treeMatrix,
			visibilityMatrix
		);
	}
	for (let j = 0; j < treeMatrix.length; j++) {
		castRay(
			0,
			j,
			{ direction: "horizontal", increment: 1 },
			treeMatrix,
			visibilityMatrix
		);
		castRay(
			treeMatrix[0].length - 1,
			j,
			{ direction: "horizontal", increment: -1 },
			treeMatrix,
			visibilityMatrix
		);
	}
	console.log(visibilityMatrix);
	console.log(
		visibilityMatrix.reduce((a, b) => a + (b.match(/1/g) || []).length, 0)
	);
}

function castRayFromTree(horizontalIndex, verticalIndex, ray, treeMatrix) {
	const originalTreeHeight = parseInt(
		treeMatrix[verticalIndex][horizontalIndex]
	);
	let maxIndex;
	if (ray.direction === "horizontal") {
		maxIndex = treeMatrix[0].length;
		horizontalIndex += ray.increment;
	} else if (ray.direction === "vertical") {
		maxIndex = treeMatrix.length;
		verticalIndex += ray.increment;
	}
	let treeScore = 0;
	while (
		0 <= horizontalIndex &&
		horizontalIndex < maxIndex &&
		0 <= verticalIndex &&
		verticalIndex < maxIndex
	) {
		const currentTreeHeight = parseInt(
			treeMatrix[verticalIndex][horizontalIndex]
		);
		treeScore++;
		if (currentTreeHeight >= originalTreeHeight) {
			break;
		} else {
			originalTreeHeight;
		}
		if (ray.direction === "horizontal") {
			horizontalIndex += ray.increment;
		} else if (ray.direction === "vertical") {
			verticalIndex += ray.increment;
		}
	}
	return treeScore;
}

async function part2() {
	let input = await readFile("./Day8/input.txt");
	const treeMatrix = parseInput(input);
	const scoreMatrix = createMatrix(treeMatrix).map((line) => line.split(""));
	const castDirections = [
		{ direction: "vertical", increment: 1 },
		{ direction: "vertical", increment: -1 },
		{ direction: "horizontal", increment: 1 },
		{ direction: "horizontal", increment: -1 },
	];
	for (let i = 0; i < treeMatrix[0].length; i++) {
		for (let j = 0; j < treeMatrix.length; j++) {
			let scenicScore = 1;
			for (const ray of castDirections) {
				scenicScore *= castRayFromTree(
					i,
					j,
					ray,
					treeMatrix,
					scoreMatrix
				);
			}
			scoreMatrix[j][i] = scenicScore;
		}
	}
	//console.log(scoreMatrix);
	console.log(Math.max(...scoreMatrix.map((row) => Math.max(...row))));
}

part2();
