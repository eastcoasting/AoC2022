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

enum Strategy {
    X = 0,
    Y = 3,
    Z = 6,
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
    const game = opponent + " " + me
    return Number(Resolution[game] + PlayScore[me])
}


const ReverseResolution = (outcome: number, opponent) => {
    return Object.entries(Resolution).filter((option) => {
        return option[1] === outcome && option[0].split(" ")[0] === opponent
    })
}


const solutionB = (formattedInput) => {
    let runningTotal = 0
    formattedInput.map((round: string) => {
        let opponent = round[0]
        let me = round[2]

        let strategicGame = ReverseResolution(Strategy[me], Options[opponent])[0]
        let [newOpponent, newMe] = strategicGame[0].split(" ")

        runningTotal += outcome(newOpponent, newMe)
    })
    console.log(runningTotal)
};

solutionB(formattedInput);


