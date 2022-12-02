import readFile from "../utils/readFiles.js";

const RockPaperScissorsMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};
const PointMap = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
const BeatsWho = { rock: "scissors", paper: "rock", scissors: "paper" };

function parseInput(input) {
  input = input.split("\r\n");
  let data = input.map((group) => {
    return group.split(" ").map((item) => RockPaperScissorsMap[item]);
  });
  return data;
}

async function main() {
  let input = await readFile("./Day2/input.txt");
  const data = parseInput(input);
  console.log(data);

  data.forEach(pair => {
    
    
  });

}

main();
