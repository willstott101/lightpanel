// File that generates the arrayIndex -> position map for an led layout

export function horizontalScanPixelMap(array, count, startPos, delta, xCount) {
    for (let i = 0; i < count; i++) {
        const yi = Math.floor(i / xCount);
        const xi = i % xCount;
        array.push({
            x: startPos.x + xi * delta.x,
            y: startPos.y + yi * delta.y,
            width: delta.x,
            height: delta.y,
        });
    }
}

export function verticalScanPixelMap(array, count, startPos, delta, yCount) {
    for (let i = 0; i < count; i++) {
        const xi = Math.floor(i / yCount);
        const yi = i % yCount;
        array.push({
            x: startPos.x + xi * delta.x,
            y: startPos.y + yi * delta.y,
            width: delta.x,
            height: delta.y,
        });
    }
}
