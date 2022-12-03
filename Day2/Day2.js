import readFile from "../utils/readFiles.js";

const RockPaperScissorsMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "lose",
  Y: "draw",
  Z: "win",
};
const PointMap = { rock: 1, paper: 2, scissors: 3 };
const BeatsWho = { rock: "scissors", paper: "rock", scissors: "paper" };
const LosesWho = { rock: "paper", paper: "scissors", scissors: "rock" };

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

  const pointsPerMatch = data.map((pair) => {
    let points = 0;
    let mypick;
    const result = pair[1];
    if (result === "lose") {
      points += 0;
      mypick = BeatsWho[pair[0]];
    } else if (result === "win") {
      points += 6;
      mypick = LosesWho[pair[0]];
    } else if (result === "draw") {
      points += 3;
      mypick = pair[0];
    }
    // choses which to pick to lose
    points += PointMap[mypick];
    return points;
  });
  console.log(pointsPerMatch);
  console.log(pointsPerMatch.reduce((a, b) => a + b, 0));
}

// Q1: 11603

main();
