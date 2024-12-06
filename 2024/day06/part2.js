const fs = require("fs");
const data = fs.readFileSync("data/input06.txt", "utf-8").split("\n");

const area = data.map(line => line.split(""));
const obstacles = new Map();

function findStartPosition() {
    for (let x = 0; x < area.length; x++) {
        let y = area[x].findIndex(c => c === '^');
        if (y !== -1) return [x, y]; 
    }
}

area.forEach((line, i) => {
    line.forEach((char, j) => {
        if (char === "#") {
            obstacles.set(`${i},${j}`, []);
        }
    });
});

function outOfArea(x, y) {
    return x >= area.length || x < 0 || y >= area[0].length || y < 0;
}

const move = [[-1, 0], [0, 1], [1, 0], [0, -1]];

function tryNewMap(new_area, new_obstacles, x, y, direction) {
    while (true) {
        let new_x = x + move[direction][0];
        let new_y = y + move[direction][1];

        if (outOfArea(new_x, new_y)) return 0;

        const key = `${new_x},${new_y}`;
        if (!new_obstacles.has(key)) {
            new_obstacles.set(key, []);
        }

        if (new_area[new_x][new_y] === "#") {
            if (new_obstacles.get(key).includes(direction)) return 1;
            else {
                new_obstacles.get(key).push(direction);
                direction = (direction + 1) % move.length;
            }
        } else {
            [x, y] = [new_x, new_y];
            new_area[x][y] = 'X';
        }
    }
}

function run(x, y, direction) {
    let sum = 0;
    while (true) {
        let new_x = x + move[direction][0];
        let new_y = y + move[direction][1];

        if (outOfArea(new_x, new_y)) break;

        const key = `${new_x},${new_y}`;

        if (area[new_x][new_y] === "#") {
            if (!obstacles.get(key).includes(direction)) obstacles.get(key).push(direction);
            direction = (direction + 1) % move.length;
        } else {
            if (area[new_x][new_y] !== "X" ){
                let new_area = area.map(line => [...line]);
                new_area[new_x][new_y] = "#";
    
                let new_obstacles = new Map();
                obstacles.forEach((value, key) => {
                    new_obstacles.set(key, [...value]);
                });
    
                sum += tryNewMap(new_area, new_obstacles, x, y, direction);    
            }

            [x, y] = [new_x, new_y];
            area[x][y] = 'X';
        }
    }
    return sum;
}
let [x, y] = findStartPosition();
console.log(run(x, y, 0));
