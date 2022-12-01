import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n");
let runningTotal = new Set<number>();
let localMax = 0;

const solutionB = (formattedInput) => {
  console.log(formattedInput);
  formattedInput.map((item) => {
    if (item === "\n" || item === "\r" || item === "") {
      runningTotal.add(localMax);

      localMax = 0;
    } else {
      localMax += Number(item.replace("\n", ""));
      console.log(item.replace("\n", ""));
    }
  });
  let listofTotals = Array.from(runningTotal).sort((a: number, b: number) => {
    return a - b;
  });
  console.log(
    "largest three:",
    listofTotals.slice(listofTotals.length - 3).reduce((prev, curr) => {
      return (prev += curr);
    }, 0)
  );
};

solutionB(formattedInput);
