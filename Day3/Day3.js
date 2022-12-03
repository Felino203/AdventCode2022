import readFile from "../utils/readFiles.js";

const alphabetValueMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

function parseInput1(input) {
  let data = input.split("\r\n");
  data = data.map((present) => {
    const packageSize = present.length / 2;
    return [present.slice(0, packageSize), present.slice(packageSize)];
  });
  return data;
}

function parseInput2(input) {
  let data = input.split("\r\n");
  const groups = [];
  for (let i = 0; i < data.length; i += 3) {
    groups.push([data[i], data[i + 1], data[i + 2]]);
  }
  return groups;
}

async function part1() {
  let input = await readFile("./Day3/input.txt");
  const data = parseInput1(input);
  const commonLetters = data.map((present) => {
    for (let i = 0; i < present[0].length; i++) {
      if (present[1].includes(present[0][i])) {
        return present[0][i];
      }
    }
  });
  console.log(commonLetters.reduce((a, b) => a + alphabetValueMap[b], 0));
  return commonLetters;
}

async function part2() {
  let input = await readFile("./Day3/input.txt");
  const data = parseInput2(input);
  console.log(data);
  const commonLetters = data.map((groups) => {
    groups.sort((a, b) => b.length - a.length);
    for (let i = 0; i < groups[0].length; i++) {
      if (
        groups[1].includes(groups[0][i]) &&
        groups[2].includes(groups[0][i])
      ) {
        return groups[0][i];
      }
    }
  });
  console.log(commonLetters.reduce((a, b) => a + alphabetValueMap[b], 0));
  return commonLetters;
}

part2();
