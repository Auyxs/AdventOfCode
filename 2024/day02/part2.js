const fs = require("fs");

const data = fs.readFileSync("data/input02.txt", "utf8").trim().split("\n");

function is_safe(report, min, max) {
    return report.every((value, i, report) => {
        if (i === 0) return true; 
        const diff = value - report[i - 1];
        return diff >= min && diff <= max; 
    });; 
}

function is_safe_with_removal (report, min, max) {
    for (let i = 0; i < report.length; i++)  {
        const newRep = report.filter((_, index) => index !== i); 
        if (is_safe(newRep, min, max)) return true;
    }
    return false;
}

let safeCount = 0;
data.forEach(line => {
    const report = line.split(/\s+/); 
    safeCount += is_safe_with_removal(report, 1, 3) || is_safe_with_removal(report, -3, -1);
});
console.log(safeCount);