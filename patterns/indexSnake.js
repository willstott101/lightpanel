import { lerpRGBasYUV, lerpRGB } from "../engine/color.js";
import { quantize } from "../engine/math.js";

export default {
    config: {
        period: 2,
        trail: 1000,
        primaryColor: {
            r: 255,
            g: 120,
            b: 120,
        },
        secondaryColor: {
            r: 0,
            g: 140,
            b: 140,
        },
    },
    global: (p, c) => {
        const index = quantize(p.time * p.length, c.period, p.length);
        return {
            index, 
        };
    },
    pixel: (p, c, g) => {
        let dist = g.index - p.index;
        if (dist < 0) {
            const distFromEnd = p.length - p.index - 1;
            dist = g.index + distFromEnd;
        }
        let pos = 1;
        if (dist > 0 && dist <= c.trail)
            pos = dist / c.trail;

        // return lerpRGBasYUV(c.primaryColor, c.secondaryColor, pos);
        return lerpRGB(c.primaryColor, c.secondaryColor, pos);
    }
};