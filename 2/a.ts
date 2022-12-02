import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n");

enum Options {
    X = "Rock",
    Y = "Paper",
    Z = "Scissors",
    A = "Rock",
    B = "Paper",
    C = "Scissors"
}

enum PlayScore {
    "Rock" = 1,
    "Paper" = 2,
    "Scissors" = 3
}

enum Resolution {
    "Rock Paper" = 6,
    "Rock Rock" = 3,
    "Rock Scissors" = 0,

    "Paper Paper" = 3,
    "Paper Rock" = 0,
    "Paper Scissors" = 6,

    "Scissors Paper" = 0,
    "Scissors Rock" = 6,
    "Scissors Scissors" = 3

}


const outcome = (opponent: string, me: string): number => {
    const game = Options[opponent] + " " + Options[me]
    return Number(Resolution[game] + PlayScore[Options[me]])
}



const solutionA = (formattedInput) => {
    let runningTotal = 0
    formattedInput.map((round: string) => {
        let opponent = round[0]
        let me = round[2]

        runningTotal += outcome(opponent, me)
    })
    console.log(runningTotal)
};

solutionA(formattedInput);
