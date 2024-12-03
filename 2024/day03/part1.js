const fs = require("fs");

const data = fs.readFileSync("data/input03.txt", "utf-8");

const calls = data.match(/mul\(\d+,\d+\)/g)

let sum = 0;
calls.forEach(call => {
    const [n1, n2] = call.match(/\d+/g);
    sum += n1*n2;
});

console.log(sum);