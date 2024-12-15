const fs = require("fs");
let [Map, moves] = fs.readFileSync("data/input15.txt", "utf-8").split(/\n\n/);
Map = Map.split("\n").map(row => row.split(""));

moves = moves.split("").map(char => {
        switch (char) {
            case "^": return [-1, 0];
            case "<": return [0, -1];
            case "v": return [1, 0];
            case ">": return [0, 1];
            default: return null; 
        }
    }).filter(move => move !== null);

function move_all(row, col, dx, dy) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (Map[newRow][newCol] === "#") return [row, col];
    if (Map[newRow][newCol] !== "O") return [newRow, newCol];

    const [nextRow, nextCol] = move_all(newRow, newCol, dx, dy);
    if (nextRow === newRow && nextCol === newCol) return [row, col];
    
    Map[nextRow][nextCol] = "O";
    return [nextRow, nextCol];
}

function move_robot([x, y]) {
    for (const [dx, dy] of moves) {
        const newRow = x + dx;
        const newCol = y + dy;

        if (Map[newRow][newCol] === "#") continue;
        if (Map[newRow][newCol] === "O") {
            const [boxRow, boxCol] = move_all(newRow, newCol, dx, dy);
            if (boxRow === newRow && boxCol === newCol) continue;
            Map[boxRow][boxCol] = "O"
        }

        Map[x][y] = "."; 
        Map[newRow][newCol] = "@"; 
        [x, y] = [newRow, newCol];
    }
}

function findStartPosition() {
    for (let x = 0; x < Map.length; x++) {
        const y = Map[x].indexOf("@");
        if (y !== -1) return [x, y];
    }
}

move_robot(findStartPosition());

let sum = 0;
Map.forEach((row, i) => row.forEach((col, j) =>{ if (col === "O") sum += 100 * i + j; }) );
console.log(sum);