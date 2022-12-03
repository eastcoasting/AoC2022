import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n").map((line) => { return line.replace("\r", "") })

const solutionA = (formattedInput: string[]) => {

    let globalStore = []

    formattedInput.map((line: string) => {

        let sharedStore = new Set()

        const start = line.slice(0, line.length / 2)
        const end = line.slice(line.length / 2)

        for (let i = 0; i < start.length; i++) {
            sharedStore.add(start[i])
        }

        for (let j = 0; j < end.length; j++) {
            if (sharedStore.has(end[j])) {
                globalStore.push(end[j])
                break
            }
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

solutionA(formattedInput);