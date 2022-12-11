import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split("\r\n");
	return data.map((line) => {
		const instruction = line.split(" ")[0];
		return {
			instruction: instruction,
			increment:
				instruction === "addx" ? parseInt(line.split(" ")[1]) : 0,
			cpuCycleUse: instruction === "addx" ? 2 : 1,
		};
	});
}

function executeProgram(instructions) {
	const xValueOverTime = [];
	let xValue = 1;
	let cpuCycle = 0;
	let instructionIndex = 0;
	while (
		cpuCycle <= instructions[instructions.length - 1].cpuTimeWhenExecuted
	) {
		const instruction = instructions[instructionIndex];
		if (cpuCycle === instruction.cpuTimeWhenExecuted) {
			xValue += instruction.increment;
			instructionIndex++;
		}
		xValueOverTime[cpuCycle] = xValue;
		cpuCycle++;
	}
	return xValueOverTime;
}

async function part1() {
	let input = await readFile("./Day10/input.txt");
	const instructions = parseInput(input);
	let cpuCycle = 1;
	// Get timestamp for instructions
	for (let i = 0; i < instructions.length; i++) {
		const instruction = instructions[i];
		cpuCycle += instruction.cpuCycleUse;
		instruction.cpuTimeWhenExecuted = cpuCycle;
		delete instruction.cpuCycleUse;
	}
	// Execute instructions
	const xValueOverTime = executeProgram(instructions);
	const interestingSignals = [
		xValueOverTime[20] * 20,
		xValueOverTime[60] * 60,
		xValueOverTime[100] * 100,
		xValueOverTime[140] * 140,
		xValueOverTime[180] * 180,
		xValueOverTime[220] * 220,
	];
	console.log(interestingSignals.reduce((a, b) => a + b, 0));
	part2(xValueOverTime);
}

function createCanvas(height) {
	const canvas = [];
	for (let i = 0; i < height; i++) {
		canvas[i] = "";
	}
	return canvas;
}

function drawPixel(canvas, y, light) {
	if (light) {
		canvas[y] += "#";
	} else {
		canvas[y] += " ";
	}
}

function spriteIsInRange(spriteX, x) {
	return spriteX - 1 <= x && x <= spriteX + 1;
}

function renderImage(xValueOverTime, canvas, width) {
	for (let i = 0; i < xValueOverTime.length - 2; i++) {
		const x = i % width;
		const y = Math.floor(i / width);
		const spriteX = xValueOverTime[i + 1];
		let light = false;
		if (spriteIsInRange(spriteX, x, y)) {
			light = true;
		}
		drawPixel(canvas, y, light);
	}
}

function part2(xValueOverTime) {
	const canvas = createCanvas(6);
	renderImage(xValueOverTime, canvas, 40);
	console.log(canvas);
}

part1();
