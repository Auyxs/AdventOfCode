const fs = require("fs");
const data = fs.readFileSync("data/input06.txt", "utf-8").split("\n");

const area = data.map(line => line.split(""));

function findStartPosition() {
    for (let x = 0; x < area.length; x++) {
        let y = area[x].findIndex(c => c === '^');
        if (y !== -1) return [x, y]; 
    }
}

function outOfArea(x, y) {
    return x >= area.length || x < 0 || y >= area[0].length || y < 0;
}

const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];

let [x, y] = findStartPosition();
let direction = 0;

while (true) {
    new_x = x + move[direction][0];
    new_y = y + move[direction][1];

    if (outOfArea(new_x, new_y)) break; 

    if (area[new_x][new_y] === "#") {
        direction = (direction + 1) % move.length; 
    } else {
        [x, y] = [new_x, new_y];
        area[x][y] = 'X';
    }
}

let tot = area.reduce((sum, line) => sum += line.filter(n => n === "X").length, 0)
console.log(tot)

