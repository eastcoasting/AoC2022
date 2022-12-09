import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8").split("\n").map((line) => line.replaceAll("\n", "").replaceAll("\r", "").split("").map((i) => +i))

const walkToEdge = (input: number[][], y: number, x: number, direction: string) => {
    let total = 0

    if (direction === "top") {
        for (let distance = y - 1; distance >= 0; distance--) {
            total += 1
            if (input[distance][x] >= input[y][x]) {
                break
            }
        }
        return total
    }
    if (direction === "down") {
        for (let distance = y + 1; distance < input.length; distance++) {
            total += 1
            if (input[distance][x] >= input[y][x]) {
                break
            }
        }
        return total
    }
    if (direction === "left") {
        for (let distance = x - 1; distance >= 0; distance--) {
            total += 1
            if (input[y][distance] >= input[y][x]) {
                break
            }
        }
        return total
    }
    if (direction === "right") {
        for (let distance = x + 1; distance < input[0].length; distance++) {
            total += 1
            if (input[y][distance] >= input[y][x]) {
                break
            }
        }
        return total
    }
    return total

}

const checkUDLR = (input: number[][], y: number, x: number) => {
    return walkToEdge(input, y, x, "top") * walkToEdge(input, y, x, "down") * walkToEdge(input, y, x, "left") * walkToEdge(input, y, x, "right")
}


const solutionB = (input: number[][]) => {
    let runningTotal = 0
    for (let y = 1; y < input.length - 1; y++) {
        for (let x = 1; x < input[y].length - 1; x++) {
            if (checkUDLR(input, y, x) > runningTotal) {
                runningTotal = checkUDLR(input, y, x)
            }
        }
    }
    console.log(runningTotal)

}

solutionB(input);
