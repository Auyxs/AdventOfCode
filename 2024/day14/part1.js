const fs = require("fs")
const data = fs.readFileSync("data/input14.txt", "utf-8").split("\n");

const WIDTH = 101, HEIGHT = 103, SECONDS = 100;
let robots = [];
data.forEach((line) => robots.push(line.match(/-?\d+/g).map(n => +n)))

for (let i = 0; i < SECONDS; i++){
    robots.forEach(robot => {
        const new_x = robot[0] + robot[2];
        const new_y = robot[1] + robot[3];
        robot[0] = (new_x + WIDTH) % WIDTH;
        robot[1] = (new_y + HEIGHT) % HEIGHT;
    })
}

let [tl, tr, bl, br] = [0, 0, 0, 0];
let [midh, midw] = [Math.floor(HEIGHT/2), Math.floor(WIDTH/2)]
robots.forEach(robot => {
    if (robot[0] < midw){
        if (robot[1] < midh) tl++;
        if (robot[1] > midh) bl++;
    }
    if (robot[0] > midw){
        if (robot[1] < midh) tr++;
        if (robot[1] > midh) br++;
    }
})

console.log(tl*tr*bl*br)