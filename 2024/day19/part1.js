const fs = require("fs");
let [towels, designs] = fs.readFileSync("data/input19.txt", "utf-8").split("\n\n");
towels = towels.split(", ");
designs = designs.split("\n");

function isPossible(design, cache = {}) {
    if (design.length === 0) return true; 
    if (cache[design] !== undefined) return cache[design]; 

    for (let towel of towels) {
        if (design.startsWith(towel)) 
            if (isPossible(design.slice(towel.length), cache)) {
                cache[design] = true; 
                return true;
            }
    }

    cache[design] = false; 
    return false;
}

let sum = designs.reduce((sum, design) => sum + isPossible(design), 0);
console.log(sum);