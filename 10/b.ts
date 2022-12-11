import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8").replaceAll("\r", "")

let formattedInput = example.split("\n")

let globaltotal = 0
let crt = [[]]
let crtRow = 0

const checkValue = (cycle, valueX) => {
    //  20th, 60th, 100th, 140th, 180th, and 220th
    const keySignalStrengths = [40, 80, 120, 160, 200, 240]
    if (keySignalStrengths.includes(cycle)) {
        globaltotal += cycle * valueX
        crtRow += 1
        crt[crtRow] = []
    }
    spritePosition(cycle, valueX, crtRow)
}



const spritePosition = (cycle, valueX, currentCRTRow) => {
    let spritePosition: number[] = [valueX - 1, valueX, valueX + 1]
    let localCycle = currentCRTRow > 0 ? cycle % 40 : cycle

    if (cycle % 40 === 0) {
        localCycle + 1
    }

    let spriteVisual = () => {
        let stringRepresentation = ["."]
        for (let i = 0; i < 39; i++) {
            stringRepresentation.push(".")
        }
        let marked = false

        for (let j = 0; j < 3; j++) {
            stringRepresentation[spritePosition[j]] = "#"
            if (stringRepresentation[spritePosition[j]] === "#" && spritePosition[j] === localCycle) {
                crt[currentCRTRow][localCycle] = "#"
                marked = true
            }
        }

        if (!marked) {
            crt[currentCRTRow][localCycle] = "."
        }

        return stringRepresentation
    }

    spriteVisual()
}

const solutionB = (formattedInput: string[]) => {
    let valueX = 1
    let cycle = 0

    for (const line of formattedInput) {
        checkValue(cycle, valueX)

        if (line === "noop") {
            cycle += 1
            checkValue(cycle, valueX)
        }
        if (line.includes("addx")) {
            let changeValue = +line.split(" ")[1]
            cycle += 1
            checkValue(cycle, valueX)
            cycle += 1
            checkValue(cycle, valueX)
            valueX += changeValue
        }
    }

    for (const crtLine of crt) {
        console.log(crtLine.join(""))
    }
}

solutionB(formattedInput);