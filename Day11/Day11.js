import readFile from "../utils/readFiles.js";

function getPrimeFactors(n) {
	const factors = new Set();
	let divisor = 2;
	while (n >= 2) {
		if (n % divisor == 0) {
			factors.add(divisor);
			n = n / divisor;
		} else {
			divisor++;
		}
		if (divisor >= 1000) {
			break;
		}
	}
	return factors;
}

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

function operate1(worryLevel, operation) {
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

function monkeyInspect1(monkeys, monkey) {
	let itemWorryLevel = monkey.items.shift();
	itemWorryLevel = operate1(itemWorryLevel, monkey.operation);
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
				monkeyInspect1(monkeys, monkey);
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

function isPrime(n) {
	if (n <= 1) return false;
	if (n <= 3) return true;
	if (n % 2 == 0 || n % 3 == 0) return false;
	for (let i = 5; i * i <= n; i = i + 6)
		if (n % i == 0 || n % (i + 2) == 0) return false;
	return true;
}

function operate2(itemValue, operation) {
	switch (operation.operator) {
		case "+":
			let number = 1;
			itemValue.factors.forEach((a) => (number *= a));
			number += parseInt(operation.operand);
			itemValue.factors = getPrimeFactors(number);
			break;
		case "*":
			if (operation.operand === "old") {
				//do nothing
			} else {
				itemValue.factors.add(operation.operand);
			}
			break;
	}
	return itemValue;
}

function monkeyInspect2(monkeys, monkey) {
	let itemValue = monkey.items.shift();
	itemValue = operate2(itemValue, monkey.operation);
	if (itemValue.factors.has(monkey.divisibleBy)) {
		monkeys[monkey.trueThrow].items.push(itemValue);
	} else {
		monkeys[monkey.falseThrow].items.push(itemValue);
	}
	monkey.timesInspected++;
}

async function part2() {
	let input = await readFile("./Day11/input.txt");
	const monkeys = parseInput(input);
	for (let round = 0; round < 1000; round++) {
		for (const monkey of monkeys) {
			while (monkey.items.length > 0) {
				monkeyInspect2(monkeys, monkey);
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

part1();
