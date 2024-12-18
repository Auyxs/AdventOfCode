const fs = require("fs");
const data = fs.readFileSync("data/input18.txt", "utf-8").split("\n");

const MOVES = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const INF = Number.MAX_SAFE_INTEGER;
const SIZE = 71; 
const grid = Array(SIZE).fill().map(() => Array(SIZE).fill("."));

for (let i = 0; i < 1024; i++) {
    let [x, y] = data[i].match(/\d+/g).map(Number);
    grid[y][x] = "#";
}

function findLeastCost() {
    const cost = Array(SIZE).fill().map(() => Array(SIZE).fill(INF));
    const pq = [[0, 0, 0]]; 
    cost[0][0] = 0;

    while (pq.length > 0) {
        const [x, y, currentScore] = pq.shift();
        if (x === 70 && y === 70) return currentScore;

        MOVES.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;

            if (ny >= 0 && ny < SIZE && nx >= 0 && nx < SIZE && grid[ny][nx] !== "#") {
                const newScore = currentScore + 1;
                if (newScore < cost[ny][nx]) {
                    cost[ny][nx] = newScore;
                    pq.push([nx, ny, newScore]);
                }
            }
        });
    }
}

console.log(findLeastCost());