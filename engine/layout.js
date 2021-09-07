// File that generates the arrayIndex -> position map for an led layout

export function horizontalZigZagPixelMap(array, indexStart, count, startPos, delta, xCount) {
    for (let i = 0; i < count; i++) {
        const yi = Math.floor(i / xCount);
        const xi = i % xCount;
        array[i + indexStart] = {
            x: startPos.x + xi * delta.x,
            y: startPos.y + yi * delta.y,
        };
    }
}

export function verticalZigZagPixelMap(array, indexStart, count, startPos, delta, yCount) {
    for (let i = 0; i < count; i++) {
        const xi = Math.floor(i / yCount);
        const yi = i % yCount;
        array[i + indexStart] = {
            x: startPos.x + xi * delta.x,
            y: startPos.y + yi * delta.y,
        };
    }
}
