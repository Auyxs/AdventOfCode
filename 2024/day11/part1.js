const fs = require("fs")
let stones = fs.readFileSync("data/input11.txt", "utf-8").split(/\s+/).map(n => Number(n));

for (let i = 0; i < 25; i++){
    for (let j = 0; j < stones.length; j++)  {
        if (stones[j] === 0) stones[j] = 1;
        else if (stones[j].toString().length % 2 === 0) {
            let s = stones[j].toString().length;
            let [left_stone, rigth_stone] = [, +stones[j].toString().slice(0, s/2)];
            stones[j] = +stones[j].toString().slice(s/2, s);
            stones.splice(j++, 0, rigth_stone);
        } else stones[j] = stones[j] * 2024;
    }
}
console.log(stones.length)