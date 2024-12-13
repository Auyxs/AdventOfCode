const fs = require("fs")
const data = fs.readFileSync("data/input13.txt", "utf-8").split(/\n\n/).map(machine => machine.split(/\n/));

let sum = 0;
data.forEach(machine => {
    const [a1, a2] = machine[0].match(/\d+/g).map(Number);
    const [b1, b2] = machine[1].match(/\d+/g).map(Number);
    let [t1, t2] = machine[2].match(/\d+/g).map(Number);
    
    const det = a1*b2 - a2*b1;
    const A = (t1*b2 - t2*b1)/det;
    const B = (a1*t2 - a2*t1)/det;
    
    if (Number.isInteger(A) && Number.isInteger(B)) sum += A*3+B;
})

console.log(sum)