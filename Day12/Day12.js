import readFile from "../utils/readFiles.js";

const toHeight = {
	a: 0,
	b: 1,
	c: 2,
	d: 3,
	e: 4,
	f: 5,
	g: 6,
	h: 7,
	i: 8,
	j: 9,
	k: 10,
	l: 11,
	m: 12,
	n: 13,
	o: 14,
	p: 15,
	q: 16,
	r: 17,
	s: 18,
	t: 19,
	u: 20,
	v: 21,
	w: 22,
	x: 23,
	y: 24,
	z: 25,
	E: 26,
	S: -1,
};

function parseInput(input) {
	const data = input.split("\r\n");
	return data;
}

function findStartingPos(heightMap) {
	let startPos;
	let endPos;
	let i = 0;
	let j = 0;
	for (const line of heightMap) {
		for (const char of line) {
			if (char) {
				if (char === "S") {
					startPos = { x: i, y: j };
				} else if (char === "E") {
					endPos = { x: i, y: j };
				}
			}
			i++;
		}
		i = 0;
		j++;
	}
	return { startPos: startPos, endPos: endPos };
}

function buildHeightMap(heightMap) {
	heightMap = heightMap.map((line) => {
		return line.split("").map((square) => {
			return {
				height: toHeight[square],
				visited: false,
			};
		});
	});
	return heightMap;
}

function findNeighbours(heightMap, x, y, startPos, endPos) {
	const position = { x: x, y: y };
	const neighbours = [];
	const currentHeight = heightMap[y][x].height;
	for (const direction of [
		{ x: -1, y: 0 },
		{ x: 1, y: 0 },
		{ x: 0, y: -1 },
		{ x: 0, y: 1 },
	]) {
		const newPosition = { ...position };
		newPosition.x += direction.x;
		newPosition.y += direction.y;
		if (
			newPosition.x < 0 ||
			newPosition.y < 0 ||
			newPosition.x >= heightMap[0].length ||
			newPosition.y >= heightMap.length
		) {
			continue;
		}
		const neighbourHeight = heightMap[newPosition.y][newPosition.x].height;
		if (currentHeight + 1 >= neighbourHeight) {
			if (
				`${newPosition.x},${newPosition.y}` ===
				`${startPos.x},${startPos.y}`
			) {
				neighbours.push("start");
			} else if (
				`${newPosition.x},${newPosition.y}` ===
				`${endPos.x},${endPos.y}`
			) {
				neighbours.push("finish");
			} else {
				neighbours.push(`${newPosition.x},${newPosition.y}`);
			}
		}
	}
	return neighbours;
}

function buildGraphArray(heightMap, startPos, endPos) {
	let graph = {};
	let i = 0;
	let j = 0;
	for (const line of heightMap) {
		for (const char of line) {
			const neighbours = findNeighbours(
				heightMap,
				i,
				j,
				startPos,
				endPos
			);
			const nodeValue = {};
			for (const neighbour of neighbours) {
				nodeValue[neighbour] = 1;
			}
			if (`${i},${j}` === `${startPos.x},${startPos.y}`) {
				graph[`start`] = nodeValue;
			} else if (`${i},${j}` === `${endPos.x},${endPos.y}`) {
				graph[`finish`] = nodeValue;
			} else {
				graph[`${i},${j}`] = nodeValue;
			}
			i++;
		}
		i = 0;
		j++;
	}
	return graph;
}

function lowestCostNode(costs, processed) {
	return Object.keys(costs).reduce((lowest, node) => {
		if (lowest === null || costs[node] < costs[lowest]) {
			if (!processed.has(node)) {
				lowest = node;
			}
		}
		return lowest;
	}, null);
}

// from https://hackernoon.com/how-to-implement-dijkstras-algorithm-in-javascript-abdfd1702d04
function dijkstra(graph) {
	// track lowest cost to reach each node
	const costs = Object.assign({ finish: Infinity }, graph.start);

	// track paths
	const parents = { finish: null };
	for (let child in graph.start) {
		parents[child] = "start";
	}

	// track nodes that have already been processed
	const processed = new Set();

	let node = lowestCostNode(costs, processed);

	while (node) {
		let cost = costs[node];
		let children = graph[node];
		for (let n in children) {
			let newCost = cost + children[n];
			if (!costs[n]) {
				costs[n] = newCost;
				parents[n] = node;
			}
			if (costs[n] > newCost) {
				costs[n] = newCost;
				parents[n] = node;
			}
		}
		processed.add(node);
		node = lowestCostNode(costs, processed);
	}

	let optimalPath = ["finish"];
	let parent = parents.finish;
	while (parent) {
		optimalPath.push(parent);
		parent = parents[parent];
	}
	optimalPath.reverse();

	const results = {
		distance: costs.finish,
		path: optimalPath,
	};

	return results;
}

async function part1() {
	let input = await readFile("./Day12/input.txt");
	let data = parseInput(input);
	const { startPos, endPos } = findStartingPos(data);
	const heightMap = buildHeightMap(data);
	const graph = buildGraphArray(heightMap, startPos, endPos);
	const results = dijkstra(graph);
	console.log(results);
}

part1();
