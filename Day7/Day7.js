import readFile from "../utils/readFiles.js";

function addFileToTree(tree, path, object) {
	const currentDir = path.shift();
	if (!tree[currentDir]) {
		tree[currentDir] = {};
	}
	if (path.length === 0) {
		if (!tree[currentDir].files) {
			tree[currentDir].files = [];
		}
		tree[currentDir].files.push(object);
		return;
	}
	if (!tree[currentDir].children) {
		tree[currentDir].children = {};
	}
	addFileToTree(tree[currentDir].children, path, object);
}

function parseInput(input) {
	const data = input.split("\r\n");
	const directoryTree = { children: {} };
	const path = [];
	for (const line of data) {
		if (line[0] === "$") {
			if (line.substring(2).split(" ")[0] === "cd") {
				if (line.substring(2).split(" ")[1] === "..") {
					path.pop();
				} else {
					const dirName = line.substring(2).split(" ")[1];
					path.push(dirName);
				}
			}
			continue;
		} else {
			if (line.split(" ")[0] !== "dir") {
				addFileToTree(directoryTree, [...path], {
					name: line.split(" ")[1],
					size: parseInt(line.split(" ")[0]),
				});
			}
			continue;
		}
	}
	return { children: { "/": directoryTree["/"] } };
}

function calculateDirSizes(dir) {
	let size = 0;
	let sum = 0;
	if (dir.files) {
		for (const file of dir.files) {
			size += file.size;
		}
	}
	if (dir.children) {
		for (const child of Object.values(dir.children)) {
			size += calculateDirSizes(child).size;
			sum += calculateDirSizes(child).sum;
		}
	}
	dir.size = size;
	if (size <= 100000 && dir.children) {
		sum += size;
	}
	return { size: size, sum: sum };
}

async function part1() {
	let input = await readFile("./Day7/input.txt");
	const directoryTree = parseInput(input);
	let sum = calculateDirSizes(directoryTree);
	console.log(sum);
}

part1();
