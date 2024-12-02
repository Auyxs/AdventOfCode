const fs = require("fs");

const data = fs.readFileSync("data/input02.txt", "utf8").trim().split("\n");

function is_safe(report, min, max) {
    return report.every((value, i, report) => {
        if (i === 0) return true; 
        const diff = value - report[i - 1];
        return diff >= min && diff <= max; 
    });; 
}

let safeCount = 0;
data.forEach(line => {
    const report = line.split(/\s+/); 
    safeCount += is_safe(report, 1, 3) || is_safe(report, -3, -1);
});
console.log(safeCount);