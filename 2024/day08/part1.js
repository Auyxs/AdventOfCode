const fs = require("fs");
const data = fs.readFileSync("data/input08.txt", "utf-8").split("\n").map(line => line.split(''));

let antennas = new Map();

data.forEach((line, i) => {
    for (let j = 0; j < line.length; j++){
        if (line[j] !== '.'){
            if (!antennas.has(line[j])) antennas.set(line[j], []);
            antennas.get(line[j]).push([i,j]);
        }
    }
})

function drawAntinodes(antenna1, antenna2) {
    const [dxA, dyA] = [antenna1[0] - antenna2[0], antenna1[1] - antenna2[1]];
    const [dxB, dyB] = [antenna2[0] - antenna1[0], antenna2[1] - antenna1[1]];

    const antinodeA = [antenna2[0] + 2 * dxA, antenna2[1] + 2 * dyA];
    const antinodeB = [antenna1[0] + 2 * dxB, antenna1[1] + 2 * dyB];

    [antinodeA, antinodeB].forEach(([x, y]) => {
        if (x >= 0 && y >= 0 && x < data.length && y < data[0].length) data[x][y] = '#';
    });
}

antennas.forEach(freq => {  
    for (let i = 0; i < freq.length; i++)
        for (let j = i + 1; j < freq.length; j++)
            drawAntinodes(freq[i], freq[j]);
})

let tot = data.reduce((sum, line) => sum += line.filter(c => c === '#').length, 0)
console.log(tot);