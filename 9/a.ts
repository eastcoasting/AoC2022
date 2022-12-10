//heavily copied from LucasDower after I failed

import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8").replace(/\r/g, "").split("\n")

let H = { Hx: 1000, Hy: 1000 }
let T = { Tx: 1000, Ty: 1000 }


const visited = new Set<string>();
visited.add(`${T.Tx},${T.Ty}`);


for (const line of input) {
    const parts = line.split(' ');
    const dir = parts[0] as 'L' | 'R' | 'U' | 'D';
    const steps = parseInt(parts[1]);

    for (let i = 0; i < steps; ++i) {
        switch (dir) {
            case 'L':
                --H.Hx;
                break;
            case 'R':
                ++H.Hx;
                break;
            case 'U':
                ++H.Hy;
                break;
            case 'D':
                --H.Hy;
                break;
        }

        const xDist = Math.abs(H.Hx - T.Tx);
        const yDist = Math.abs(H.Hy - T.Ty);
        const manDist = xDist + yDist;

        const moveX = xDist >= 2 || manDist >= 3;
        const moveY = yDist >= 2 || manDist >= 3;

        if (moveX) {
            T.Tx += H.Hx > T.Tx ? 1 : -1;
        }
        if (moveY) {
            T.Ty += H.Hy > T.Ty ? 1 : -1;
        }

        visited.add(`${T.Tx},${T.Ty}`);
    }
}


console.log(visited.size)