import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8").replaceAll("\r", "")

let formattedInput = example.split("\n")

let globaltotal = 0

const checkValue = (cycle, valueX) => {
    //  20th, 60th, 100th, 140th, 180th, and 220th
    const keySignalStrengths = [20, 60, 100, 140, 180, 220]
    if (keySignalStrengths.includes(cycle)) {
        globaltotal += cycle * valueX
    }
}

const solutionA = (formattedInput: string[]) => {
    let valueX = 1
    let cycle = 0

    for (const line of formattedInput) {
        if (line === "noop") {
            cycle += 1
            checkValue(cycle, valueX)
        }
        if (line.includes("addx")) {
            let localCycle = cycle
            let changeValue = +line.split(" ")[1]
            localCycle = localCycle + 1
            checkValue(localCycle, valueX)
            localCycle = localCycle + 1
            checkValue(localCycle, valueX)
            valueX += changeValue
            cycle = localCycle
        }
    }
    console.log(globaltotal)
}

solutionA(formattedInput);