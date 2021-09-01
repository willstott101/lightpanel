// File that generates the arrayIndex -> position map for an led layout

function horizontalZigZagPixelMap(array, indexStart, count, startPos, xDist, yDist, xCount) {
    for (let i = 0; i < count; i++) {
        const yi = Math.floor(i / xCount);
        const xi = i % xCount;
        array[i + indexStart] = {
            x: startPos.x + xi * xDist,
            y: startPos.y + yi * yDist,
        };
    }
}

function verticalZigZagPixelMap(array, indexStart, count, startPos, xDist, yDist, yCount) {
    for (let i = 0; i < count; i++) {
        const xi = Math.floor(i / yCount);
        const yi = i % yCount;
        array[i + indexStart] = {
            x: startPos.x + xi * xDist,
            y: startPos.y + yi * yDist,
        };
    }
}
