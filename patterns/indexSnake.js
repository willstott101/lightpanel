import { lerpRGBasYUV, lerpRGB } from "../engine/color.js";
import { quantize } from "../engine/math.js";

export default {
    config: {
        period: 100,
        trail: 6,
        count: 20,
        primaryColor: {
            r: 255,
            g: 10,
            b: 10,
        },
        secondaryColor: {
            r: 0,
            g: 128,
            b: 128,
        },
    },
    global: (p, c) => {
        const indices = [];
        const currentPos = p.time;
        const eachHeadOffset = p.length / c.count;
        for (let i = 0; i < c.count; i++)
            indices.push(quantize(currentPos, c.period, p.length, eachHeadOffset * i));
        return {
            indices,
        };
    },
    pixel: (p, c, g) => {
        const potentialPositions = g.indices.map(i => {
            let dist = i - p.index;
            if (dist < 0) {
                const distFromEnd = p.length - p.index - 1;
                dist = i + distFromEnd;
            }
            let pos = 1;
            if (dist > 0 && dist <= c.trail)
                pos = dist / c.trail;
            return pos;
        });
        const pos = Math.min(...potentialPositions);

        // return lerpRGBasYUV(c.primaryColor, c.secondaryColor, pos);
        return lerpRGB(c.primaryColor, c.secondaryColor, pos);
    }
};