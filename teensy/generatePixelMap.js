const WIDTH = 16;
const HEIGHT = 25;

const rowStrips = [
    2, 2, 2,
    0, 0, 0,
    3, 3, 3,
    1, 1, 1,
    6, 6, 6, 6,
    4, 4, 4, 4,
    5, 5,
    7, 7, 7
];
const rowPosInStrip = [
    2, 1, 0,
    2, 1, 0,
    2, 1, 0,
    2, 1, 0,
    3, 2, 1, 0,
    3, 2, 1, 0,
    1, 0,
    2, 1, 0,
];

const maxStripLength = (Math.max(...rowPosInStrip) + 1) * WIDTH;
console.log("maxStripLength", maxStripLength);
console.log("totalNumVirtualLEDs", maxStripLength * 8);

const pixmap = [];
for (let y = 0; y < HEIGHT; y++) {
    let offset = rowStrips[y] * maxStripLength;
    offset += rowPosInStrip[y] * WIDTH;
    const reverse = rowPosInStrip[y] % 2 === 1;
    for (let x = 0; x < WIDTH; x++) {
        if (reverse) {
            pixmap.push(offset + WIDTH - x - 1);    
        } else {
            pixmap.push(offset + x);
        }
    }
}

console.log("pixmap");
process.stdout.write(JSON.stringify(pixmap));
