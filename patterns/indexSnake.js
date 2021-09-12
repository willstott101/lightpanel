import { lerpRGBasYUV, lerpRGB } from "../engine/color.js";
import { quantize } from "../engine/math.js";

export default {
    config: {
        period: 3,
        trail: 10,
        speed: 50,
        primaryColor: {
            r: 255,
            g: 0,
            b: 0,
        },
        secondaryColor: {
            r: 0,
            g: 200,
            b: 0,
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