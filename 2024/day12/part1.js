const fs = require("fs");
const data = fs.readFileSync("data/input12.txt", "utf-8").split('\n').map(line => line.split(''));

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const visited = Array(data.length).fill().map(() => Array(data[0].length).fill(false));
const plots = [];

function isValid(row, col) {
    return row >= 0 && row < data.length && col >= 0 && col < data[0].length;
}

function delimit_area(row, col, char) {
    if (!isValid(row, col) || visited[row][col] || data[row][col] !== char) 
        return { size: 0, perimeter: 0 };

    visited[row][col] = true;
    let result = {
        size: 1,
        perimeter: 0,
    };

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (!isValid(newRow, newCol) || data[newRow][newCol] !== char) {
            result.perimeter++;
        } else if (!visited[newRow][newCol]) {
            const subArea = delimit_area(newRow, newCol, char);
            result.size += subArea.size;
            result.perimeter += subArea.perimeter;
        }
    }
    return result;
}

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
        if (!visited[i][j]) {
            const char = data[i][j];
            const area = delimit_area(i, j, char);
            if (area.size > 0) plots.push(area);
        }
    }
}

const sum = plots.reduce((total, plot) => total + plot.size * plot.perimeter, 0);
console.log(sum);