const fs = require("fs");

const data = fs.readFileSync("data/input01.txt", "utf8").trim().split("\n");

let col1 = [];
let count = new Map();

data.forEach(line => {
    const [num, key] = line.split(/\s+/); 
    col1.push(num);
    count.set(key, (count.get(key) || 0) + 1)
});

let result = col1.reduce((score, num) => score + num * (count.get(num) || 0), 0);

console.log(result);
