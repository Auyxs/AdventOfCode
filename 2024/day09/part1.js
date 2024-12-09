const fs = require("fs");
const data = fs.readFileSync("data/input09.txt", "utf-8").split("");

let hdrive = [];
let fileID = 0;

for (let i = 0; i < data.length; i++) {
    const char = i % 2 === 0 ? fileID++ : "."; 
    hdrive.push(...Array(+data[i]).fill(char));
}

let compact = [];
let j = hdrive.length - 1;
for (let i = 0; i <= j; i++){
    if (hdrive[i] !== ".") {  
        compact[i] = hdrive[i];
    } else {
        while (hdrive[j] === ".") j--;
        compact[i] = hdrive[j];
        j--;
    }
}

const checksum = compact.reduce((sum, n, i) => sum += n*i, 0)
console.log(checksum)