const fs = require("fs");
const data = fs.readFileSync("data/input04.txt", "utf-8").split("\n");

function matchX(data, i, j , direction){
    let up_corner = data[i-1][j + (direction === "forward" ? -1 : 1)];
    let down_corner = data[i+1][j + (direction === "forward" ? 1 : -1)];
    return (up_corner === "M" && down_corner === "S") || (up_corner === "S" && down_corner === "M")
}

function search(data) {
    let sum = 0;
    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            if (data[i][j] === "A") sum += matchX(data, i ,j, "forward") && matchX(data, i ,j, "back");
        }
    }
    return sum;
}

console.log(search(data))