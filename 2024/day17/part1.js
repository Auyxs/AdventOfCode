const fs = require("fs");
const data = fs.readFileSync("data/input17.txt", "utf-8");
let [A, B, C, ...program] = data.match(/\d+/gm).map(Number);

let ptr = 0;
const output = [];

const divide = (n) => Math.floor(A / 2 ** n);

const getvalue = (operand) => {
    if (operand === 4) return A;
    if (operand === 5) return B;
    if (operand === 6) return C;
    return operand;  
};

while (program[ptr] !== undefined) {
    const opcode = program[ptr];
    const operand = program[ptr + 1];
    const combo = getvalue(operand);

    switch (opcode) {
        case 0:
            A = divide(combo);
            break;
        case 1:
            B ^= operand;
            break;
        case 2:
            B = combo % 8;
            break;
        case 3:
            if (A !== 0) ptr = operand -2;
            break;
        case 4:
            B ^= C;
            break;
        case 5:
            output.push(combo % 8);
            break;
        case 6:
            B = divide(combo);
            break;
        case 7:
            C = divide(combo);
            break;
    }

    ptr += 2; 
}

console.log(output.join(','));