import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n").map((line) => { return line.replace("\r", "") })

const solutionB = (formattedInput: string[]) => {
    let globalStore = []

    let chunkByThree = 0
    let rucksackMap = new Map()
    let lineSet = new Set()

    formattedInput.map((line: string) => {
        for (let i = 0; i < line.length; i++) {

            if (chunkByThree === 0) {
                lineSet.add(line[i])
            } else {
                if (lineSet.has(line[i]) && chunkByThree === 1) {
                    rucksackMap.set(line[i], 2)
                } if (chunkByThree === 2 && rucksackMap.get(line[i]) === 2) {
                    globalStore.push(line[i])
                    break
                }
            }
        }

        if (chunkByThree === 2) {
            chunkByThree = 0
            lineSet = new Set()
            rucksackMap = new Map()
        } else {
            chunkByThree += 1
        }
    })

    let totalScore = 0

    globalStore.map((curr: string) => {
        if (curr.toLowerCase() === curr) {
            totalScore += (curr.charCodeAt(0) - 96)
        } else {
            totalScore += (curr.charCodeAt(0) - 38)
        }
    })
    console.log(totalScore)
};

solutionB(formattedInput);
