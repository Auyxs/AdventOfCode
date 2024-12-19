const fs = require("fs");
let [towels, designs] = fs.readFileSync("data/input19.txt", "utf-8").split("\n\n");
towels = towels.split(", ");
designs = designs.split("\n");

function countPossibilities(design, cache = {}) {
    if (design.length === 0) return 1; 
    if (cache[design] !== undefined) return cache[design]; 

    let count = 0; 
    for (let towel of towels) {
        if (design.startsWith(towel)) {
            count += countPossibilities(design.slice(towel.length), cache);
        }
    }

    cache[design] = count; 
    return count;
}

let totalSum = designs.reduce((sum, design) => sum + countPossibilities(design), 0);
console.log(totalSum);