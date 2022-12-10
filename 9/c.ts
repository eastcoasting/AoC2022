// My ridiculous solution that was off by 3, but worked for the example

import * as fs from "fs";

let input = fs.readFileSync("example.txt", "utf8").replace(/\r/g, "").split("\n")

let grid = [...Array(5)].map(_ => Array(6).fill(" "))

let H = { Hx: 0, Hy: 4 }
let T = { Tx: 0, Ty: 4 }

const executetimes = (nTimes: number, executeFunc: () => void) => {
    while (nTimes--) {
        let tempPosition = structuredClone(grid)
        coalesceDiagonal()
        executeFunc()
        console.log(H, T)
        tempPosition[H.Hy][H.Hx] = "H"
        tempPosition[T.Ty][T.Tx] = "T"
        console.log(tempPosition)
    }
}

const iterateMoves = (direction: string, nMoves: number) => {
    if (direction === "U") {
        const incrementDown = () => {
            const nextHy = H.Hy - 1
            H.Hy = nextHy
            T.Ty = nextHy + 1
            grid[T.Ty][T.Tx] = "#"
        }
        executetimes(nMoves, incrementDown)
    }
    else if (direction === "D") {
        const incrementDown = () => {
            const nextHy = H.Hy + 1
            H.Hy = nextHy
            T.Ty = nextHy - 1
            grid[T.Ty][T.Tx] = "#"
        }
        executetimes(nMoves, incrementDown)
    }
    else if (direction === "L") {
        const incrementLeft = () => {
            const nextHx = H.Hx - 1
            H.Hx = nextHx
            T.Tx = nextHx + 1
            grid[T.Ty][T.Tx] = "#"
        }
        executetimes(nMoves, incrementLeft)
    }
    else if (direction === "R") {
        const incrementRight = () => {
            const nextHx = H.Hx + 1
            H.Hx = nextHx
            T.Tx = nextHx - 1
            grid[T.Ty][T.Tx] = "#"
        }
        executetimes(nMoves, incrementRight)
    }

}

const moveHtoT = (): void => {
    T.Tx = H.Hx * 1
    T.Ty = H.Hy * 1
    grid[T.Ty][T.Tx] = "#"
}

const coalesceDiagonal = () => {
    if (Math.abs(H.Hx - T.Tx) > 1) {
        T.Tx = (H.Hx * 1) - 1
        T.Ty = (H.Hy * 1)
        grid[T.Ty][T.Tx] = "#"
        console.log('aa')
    }
    if (Math.abs(H.Hy - T.Ty) > 1) {
        T.Ty = (H.Hy * 1) - 1
        T.Tx = (H.Hx * 1)
        grid[T.Ty][T.Tx] = "#"
    }
}


const walkSwitch = (command: string) => {
    const [direction, moveString] = command.split(" ");
    let nMoves = +moveString

    if (!direction || !moveString) {
        return;
    }

    if (isNaN(nMoves) || nMoves === 0) {
        return;
    }

    if (direction === "L" && (T.Tx < H.Hx)) {
        // if moving left and tail is greater than head x then pass
        H.Hx -= 1
        nMoves -= 1
    }

    if (direction === "R" && (T.Tx > H.Hx)) {
        // if moving right and tail is less than head x then pass
        H.Hx += 1
        nMoves -= 1
    }

    if (direction === "U" && (T.Ty < H.Hy)) {
        // if moving up and tail is less than head y then pass
        H.Hy -= 1
        nMoves -= 1
    }

    if (direction === "D" && (T.Ty > H.Hy)) {
        // if moving down and tail is greater than head y then pass
        H.Hy += 1
        nMoves -= 1
    }


    if ((direction === "L" || direction === "R")) {
        if (H.Hy === T.Ty) {
            iterateMoves(direction, nMoves)
        } else if (nMoves === 1) {
            if (direction === "L") {
                H.Hx -= 1
                nMoves = 0
                coalesceDiagonal()
            }
            if (direction === "R") {
                H.Hx += 1
                nMoves = 0
                coalesceDiagonal()
            }
        } else if (nMoves > 1) {
            iterateMoves(direction, 1)
            moveHtoT()
            iterateMoves(direction, nMoves - 1)
        }
    }

    else if ((direction === "U" || direction === "D")) {
        if (H.Hx === T.Tx) {
            iterateMoves(direction, nMoves)
        } else if (nMoves === 1) {
            if (direction === "U") {
                H.Hy -= 1
                nMoves = 0
                coalesceDiagonal()
            }
            if (direction === "D") {
                H.Hy += 1
                nMoves = 0
                coalesceDiagonal()
            }
        } else if (nMoves > 1) {
            iterateMoves(direction, 1)
            moveHtoT()
            iterateMoves(direction, nMoves - 1)
        }
    }

}


const solutionA = (input: string[]) => {

    grid[H.Hy][H.Hx] = "H"
    grid[T.Ty][T.Tx] = "T"

    console.log(grid)

    for (const line of input) {
        console.log(line)
        coalesceDiagonal()
        walkSwitch(line)


        console.log("result after move: \n\n\n")
        console.log(H, T)
        let tempPosition = structuredClone(grid)
        tempPosition[H.Hy][H.Hx] = "H"
        tempPosition[T.Ty][T.Tx] = "T"
        console.log(tempPosition)
    }
    let score = 0
    grid.forEach((row) => row.forEach((item) => {
        if (item === "#") {
            score += 1
        }
    }))

    console.log(grid)

    console.log(score)

}

solutionA(input);