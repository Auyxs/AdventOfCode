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

// Fix the update by swapping elements if a dependency rule exists, return the middle element if fixed, else 0.
function correct_update(update){
    let isFixed = false;
    for(let i = 1; i < update.length; i++){
        for (let j = 0; j < i; j++){
            if (rules.has(update[i]) && rules.get(update[i]).includes(update[j])) {
                [update[i], update[j]] = [update[j], update[i]];
                isFixed = true;
            }
        }
    }
    return isFixed ? +update[Math.floor(update.length/2)] : 0;
}

let sum = updates.reduce((sum, update) => sum += correct_update(update.split(",")), 0)
console.log(sum)