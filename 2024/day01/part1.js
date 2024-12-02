const fs = require("fs");

const data = fs.readFileSync("data/input01.txt", "utf8").trim().split("\n");

let col1 = [];
let col2 = [];

data.forEach(line => {
    const nums = line.split(/\s+/); 
    col1.push(+nums[0]);
    col2.push(+nums[1]);
});

col1.sort((a, b) => a - b);
col2.sort((a, b) => a - b);

let sum = col1.reduce((sum, num, i) => sum + Math.abs(num - col2[i]), 0);

console.log(sum);