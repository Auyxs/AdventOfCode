const fs = require("fs");
const data = fs.readFileSync("data/input10.txt", "utf-8").split("\n").map(line => line.split("").map(Number)); 

const steps = [ [1, 0], [0, 1], [-1, 0], [0, -1] ];

function is_valid_step(x, y, new_x, new_y){
    return  new_x >= 0 && new_x < data.length &&
            new_y >= 0 && new_y < data[0].length &&
            data[new_x][new_y] === data[x][y] + 1;
}

function hike(x, y) {
    if (data[x][y] === 9) return [[x, y]]; 
    let result = [];
    steps.forEach(step => {
        const new_x = x + step[0];
        const new_y = y + step[1];
        if (is_valid_step(x, y, new_x, new_y)) result = result.concat(hike(new_x, new_y));
    });
    
    return result;
}

function tailhead_score(x, y) {
    let count = 0;
    steps.forEach(step => {
        const new_x = x + step[0];
        const new_y = y + step[1];
        if (is_valid_step(x, y, new_x, new_y)) count += hike(new_x, new_y).length;
    });
    return count;
}

let sum = 0;
data.forEach((line, i) => {
    line.forEach((num, j) => {
        if (num === 0) sum += tailhead_score(i, j);
    });
});

console.log(sum);