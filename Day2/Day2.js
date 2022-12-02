import readFile from "../utils/readFiles.js";

function parseInput(input) {
  input = input.split("\r\n");
  const data = input.map((group) => {
    return group.split(" ");
  });
  return data;
}

async function main() {
  let input = await readFile("./Day2/input.txt");
  const data = parseInput(input);
  console.log(data);

  


}

main();
