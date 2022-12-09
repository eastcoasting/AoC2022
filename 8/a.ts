import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8").split("\n").map((line) => line.replaceAll("\n", "").replaceAll("\r", "").split("").map((i) => +i))

const walkToEdge = (input: number[][], y: number, x: number, direction: string) => {
    let check = true

    if (direction === "top") {
        for (let distance = y - 1; distance >= 0; distance--) {
            if (input[distance][x] >= input[y][x]) {
                check = false
                break
            }
        }
        return check
    }
    if (direction === "down") {
        for (let distance = y + 1; distance < input.length; distance++) {
            if (input[distance][x] >= input[y][x]) {
                check = false
                break
            }
        }
        return check
    }
    if (direction === "left") {
        for (let distance = x - 1; distance >= 0; distance--) {
            if (input[y][distance] >= input[y][x]) {
                check = false
                break
            }
        }
        return check
    }
    if (direction === "right") {
        for (let distance = x + 1; distance < input[0].length; distance++) {
            if (input[y][distance] >= input[y][x]) {
                check = false
                break
            }
        }
        return check
    }
    return check

}

const checkUDLR = (input: number[][], y: number, x: number) => {
    // check from top
    if (input[y - 1][x] <= input[y][x] && walkToEdge(input, y, x, "top")) {
        inputMark[y][x] = inputMark[y][x] + "t"
        return true
    }
    // check from down
    if (input[y + 1][x] <= input[y][x] && walkToEdge(input, y, x, "down")) {
        inputMark[y][x] = inputMark[y][x] + "d"
        return true
    }
    // check from left
    if (input[y][x - 1] <= input[y][x] && walkToEdge(input, y, x, "left")) {
        inputMark[y][x] = inputMark[y][x] + "l"
        return true
    }
    // check from right
    if (input[y][x + 1] <= input[y][x] && walkToEdge(input, y, x, "right")) {
        inputMark[y][x] = inputMark[y][x] + "r"
        return true
    }

}

let inputMark = structuredClone(input).map((row) => { return row.map((col) => { return "" }) })

const solutionA = (input: number[][]) => {
    let runningTotal = 0
    for (let y = 1; y < input.length - 1; y++) {

        for (let x = 1; x < input[y].length - 1; x++) {
            if (checkUDLR(input, y, x)) {
                runningTotal += 1
            }
        }
    }
    console.log(runningTotal + (input.length * 2) + (input[0].length * 2) - 4)

}

solutionA(input);
