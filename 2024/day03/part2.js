const fs = require("fs");

const data = fs.readFileSync("data/input03.txt", "utf-8").split(/(don\'t\(\)|do\(\))/);

const regex = /mul\(\d+,\d+\)/g;
prevBlock = "do()";
sum = 0;

data.forEach(block =>{
    if (prevBlock === "do()") {
        const calls = block.match(regex)
        calls.forEach(call => {
            const [n1, n2] = call.match(/\d+/g);
            sum += n1*n2;
        });
    }
    prevBlock = block;
});

console.log(sum);