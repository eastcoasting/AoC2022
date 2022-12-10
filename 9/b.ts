//heavily copied from LucasDower after I failed

import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8").replace(/\r/g, "").split("\n")

let H = { x: 0, y: 0 }
let T = { x: 0, y: 0 }

const rope = [
    H,
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    T,
];


const visited = new Set<string>();
visited.add(`${T.x},${T.y}`);


for (const line of input) {
    const parts = line.split(' ');
    const dir = parts[0] as 'L' | 'R' | 'U' | 'D';
    const steps = parseInt(parts[1]);

    for (let i = 0; i < steps; ++i) {
        switch (dir) {
            case 'L':
                --H.x;
                break;
            case 'R':
                ++H.x;
                break;
            case 'U':
                ++H.y;
                break;
            case 'D':
                --H.y;
                break;
        }


        for (let move = 0; move < 9; move++) {
            const pairT = rope[move + 1]
            const pairH = rope[move]

            const xDist = Math.abs(pairH.x - pairT.x);
            const yDist = Math.abs(pairH.y - pairT.y);
            const manDist = xDist + yDist;

            const moveX = xDist >= 2 || manDist >= 3;
            const moveY = yDist >= 2 || manDist >= 3;

            if (moveX) {
                pairT.x += pairH.x > pairT.x ? 1 : -1;
            }
            if (moveY) {
                pairT.y += pairH.y > pairT.y ? 1 : -1;
            }
        }
        visited.add(`${T.x},${T.y}`);


    }
}


console.log(visited.size)