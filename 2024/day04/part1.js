const fs = require("fs");
const data = fs.readFileSync("data/input04.txt", "utf-8").split("\n");

const WORD = "XMAS";
const WORD_reverse = "SAMX";

function search_horizontal(data) {
    let sum = 0;
    data.forEach(line => {
        const matched1 = line.match(/XMAS/g); 
        const matched2 = line.match(/SAMX/g);  
        sum += matched1 ? matched1.length : 0;
        sum += matched2 ? matched2.length : 0;
    });
    return sum;
}

function match_diagonal(WORD, data, i, j, direction) {
    for (let k = 0; k < WORD.length; k++) {
        const row = i + k;
        const col = j + (direction === "forward" ? k : -k);
        if (row >= data.length || col < 0 || col >= data[0].length || data[row][col] !== WORD[k]) {
            return false;
        }
    }
    return true;
}

function search_diagonal(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            sum += match_diagonal(WORD, data, i, j, "forward") || match_diagonal(WORD_reverse, data, i, j, "forward");
            sum += match_diagonal(WORD, data, i, j, "back") || match_diagonal(WORD_reverse, data, i, j, "back");
        }
    }
    return sum;
}


const dataArray = data.map(row => row.split("")); 
const data_transposed = dataArray[0].map((_, colIndex) => 
  dataArray.map(row => row[colIndex])
);
const data2 = data_transposed.map(row => row.join(""));


let tot = search_horizontal(data) + search_horizontal(data2) + search_diagonal(data);
console.log(tot);
