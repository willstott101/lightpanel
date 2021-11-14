const WIDTH = 16;
const HEIGHT = 25;

const rowStrips = [
    2, 2, 2,
    0, 0, 0,
    3, 3, 3,
    1, 1, 1,
    4, 4, 4, 4,
    5, 5, 5, 5,
    6, 6,
    7, 7, 7
];
const rowPosInStrip = [
    2, 1, 0,
    2, 1, 0,
    2, 1, 0,
    2, 1, 0,
    0, 1, 2, 3,
    0, 1, 2, 3,
    0, 1,
    0, 1, 2,
];

const maxStripLength = (Math.max(...rowPosInStrip) + 1) * WIDTH;
console.log("maxStripLength", maxStripLength);
console.log("totalNumVirtualLEDs", maxStripLength * 8);

const pixmap = [];
for (let y = 0; y < HEIGHT; y++) {
    let offset = rowStrips[y] * maxStripLength;
    offset += rowPosInStrip[y] * WIDTH;
    for (let x = 0; x < WIDTH; x++) {
        pixmap.push(offset + x);
    }
}

console.log("pixmap");
process.stdout.write(JSON.stringify(pixmap));
