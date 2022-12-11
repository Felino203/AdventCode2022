import readFile from "../utils/readFiles.js";

function parseInput(input) {
	const data = input.split("\r\n\r\n");
	return data.map((monkey) => {
		const monkeyLines = monkey.split("\r\n");
		const fullOperation = monkeyLines[2].split(":")[1].split("= old ")[1];
		return {
			monkeyNo: parseInt(monkeyLines[0].split(" ")[1]),
			items: monkeyLines[1]
				.split(": ")[1]
				.split(", ")
				.map((item) => parseInt(item)),
			operation: {
				operator: fullOperation[0],
				operand: fullOperation
					.substring(1, fullOperation.length)
					.trim(),
			},
			divisibleBy: parseInt(
				monkeyLines[3].split(":")[1].split("divisible by ")[1]
			),
			trueThrow: parseInt(
				monkeyLines[4].split(":")[1].split("monkey ")[1]
			),
			falseThrow: parseInt(
				monkeyLines[5].split(":")[1].split("monkey ")[1]
			),
			timesInspected: 0,
		};
	});
}

function operate(worryLevel, operation) {
	switch (operation.operator) {
		case "+":
			worryLevel += parseInt(operation.operand);
			break;
		case "*":
			if (operation.operand === "old") {
				worryLevel *= worryLevel;
			} else {
				worryLevel *= parseInt(operation.operand);
			}
			break;
	}
	return worryLevel;
}

function monkeyInspect(monkeys, monkey) {
	let itemWorryLevel = monkey.items.shift();
	itemWorryLevel = operate(itemWorryLevel, monkey.operation);
	itemWorryLevel = Math.floor(itemWorryLevel / 3);
	if (itemWorryLevel % monkey.divisibleBy === 0) {
		monkeys[monkey.trueThrow].items.push(itemWorryLevel);
	} else {
		monkeys[monkey.falseThrow].items.push(itemWorryLevel);
	}
	monkey.timesInspected++;
}

async function part1() {
	let input = await readFile("./Day11/input.txt");
	const monkeys = parseInput(input);
	for (let round = 0; round < 20; round++) {
		for (const monkey of monkeys) {
			while (monkey.items.length > 0) {
				monkeyInspect(monkeys, monkey);
			}
		}
	}
	console.log(monkeys);
	const monkeyTimesInspected = monkeys
		.map((info) => info.timesInspected)
		.sort((a, b) => b - a, 0);
	console.log(monkeyTimesInspected);
	console.log(monkeyTimesInspected[0] * monkeyTimesInspected[1]);
}

// 63222 to high
// 58548 to low

part1();
