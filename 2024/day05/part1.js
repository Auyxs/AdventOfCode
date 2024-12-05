const fs = require("fs");
const data = fs.readFileSync("data/input05.txt", "utf-8").split("\n\n");

const rulesDef = data[0].split("\n");
const updates = data[1].split("\n");
const rules = new Map();

rulesDef.forEach(rule =>{
    const [key, value] = rule.match(/\d+/g);
    if (!rules.has(key)) rules.set(key, []); 
    rules.get(key).push(value);
})

// Check if any previous element in the update has a dependency rule with the current element.
function is_correct(update){
    for(let i = 1; i < update.length; i++){
        for (let j = 0; j < i; j++){
            if (rules.has(update[i]) && rules.get(update[i]).includes(update[j])) return 0;
        }
    }
    return +update[Math.floor(update.length/2)];
}

let sum = updates.reduce((sum, update) => sum += is_correct(update.split(",")), 0)
console.log(sum)