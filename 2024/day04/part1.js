const fs = require("fs");
const data = fs.readFileSync("data/input04.txt", "utf-8").split("\n");

const WORD = "XMAS";
const WORD_reverse = "SAMX";

function search_horizontal(data, word) {
    let sum = 0;
    data.forEach(line => {
        const matched = line.match(new RegExp(word, "g"));
        sum += matched ? matched.length : 0;
    });
    return sum;
}

function match_diagonal(WORD, data, i, j, direction) {
    for (let k = 1; k < WORD.length; k++) {
        const row = i + k;
        const col = j + (direction === "forward" ? k : -k);
        if (col < 0 || col >= data[0].length || data[row][col] !== WORD[k]) {
            return false;
        }
    }
    return true;
}

function search_diagonal(data) {
    let sum = 0;
    for (let i = 0; i <= data.length - WORD.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j] === WORD[0]) sum += match_diagonal(WORD, data, i, j, "forward") + match_diagonal(WORD, data, i, j, "back");
            if (data[i][j] === WORD_reverse[0]) sum += match_diagonal(WORD_reverse, data, i, j, "forward") + match_diagonal(WORD_reverse, data, i, j, "back");
        }
    }
    return sum;
}

const dataArray = data.map(row => row.split("")); 
const data_transposed = dataArray[0].map((_, colIndex) => dataArray.map(row => row[colIndex]));
const data2 = data_transposed.map(row => row.join(""));

let horizontal = search_horizontal(data, WORD) + search_horizontal(data, WORD_reverse)
let vertical = search_horizontal(data2, WORD) + search_horizontal(data2, WORD_reverse)
let tot = horizontal + vertical + search_diagonal(data);
console.log(tot);