import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n");
let runningTotal = 0;
let localMax = 0;

const solutionA = (formattedInput) => {
  console.log(formattedInput);
  formattedInput.map((item) => {
    if (item === "\n" || item === "\r" || item === "") {
      if (localMax > runningTotal) {
        runningTotal = localMax;
      }
      localMax = 0;
    } else {
      localMax += Number(item.replace("\n", ""));
      console.log(item.replace("\n", ""));
    }
  });
};

solutionA(formattedInput);
