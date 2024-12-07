const fs = require("fs");
const data = fs.readFileSync("data/input07.txt", "utf-8").split("\n");
const equations = data.map(line => line.split(/ |: /).map(Number)); 

const operations = [
    (a, b) => a + b, 
    (a, b) => a * b,
    // (a, b) => +(String(a) + b) // uncomment to solve part 2
];

function tryOperation(eq, i, tot) {
    if (i >= eq.length) return tot === eq[0];
    return operations.some(op => tryOperation(eq, i + 1, op(tot, eq[i])));;
}

const result = equations.reduce((sum, eq) => sum += tryOperation(eq, 2, eq[1]) ? eq[0] : 0, 0);
console.log(result);