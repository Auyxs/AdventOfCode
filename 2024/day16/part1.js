const fs = require("fs");
const data = fs.readFileSync("data/input16.txt", "utf-8").split("\n").map(row => row.split(""));

const MOVES = [[0, 1], [1, 0], [0, -1], [-1, 0]]; 
const INF = Number.MAX_SAFE_INTEGER;

function findLeastCost() {
    const rows = data.length;
    const cols = data[0].length;

    const cost = Array.from({ length: rows }, () => Array(cols).fill(INF));
    const pq = [[rows - 2, 1, 0, 0]];
    cost[rows - 2][1] = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a[2] - b[2]);
        const [x, y, currentScore, m] = pq.shift();

        if (data[x][y] === 'E') return currentScore;

        const moves = [m, (m + 1) % 4, (m - 1 + 4) % 4];

        for (const direction of moves) {
            const nx = x + MOVES[direction][0];
            const ny = y + MOVES[direction][1];

            if (data[nx][ny] !== '#') {
                const newScore = currentScore + (direction === m ? 1 : 1001); 
                if (newScore < cost[nx][ny]) {
                    cost[nx][ny] = newScore;
                    pq.push([nx, ny, newScore, direction]);
                }
            }
        }
    }

}

console.log(findLeastCost());
