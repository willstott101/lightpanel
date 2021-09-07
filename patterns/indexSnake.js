import { lerpRGBasYUV } from "../engine/color.js";
import { quantize } from "../engine/math.js";

export default {
    config: {
        period: 1,
        trail: 5,
        speed: 50,
        primaryColor: {
            r: 255,
            g: 255,
            b: 0,
        },
        secondaryColor: {
            r: 0,
            g: 200,
            b: 200,
        },
    },
    global: (d, c) => {
        return {
            index: quantize(d.time, c.period, c.length),
        };
    },
    pixel: (p, c, g) => {
        let dist = g.index - p.index;
        const pos = 1;
        if (dist < 0) {
            const distFromEnd = p.length - p.index - 1;
            dist = g.index + distFromEnd;
        }
        if (dist > 0 && dist <= c.trail)
            pos = dist / c.trail;

        return lerpRGBasYUV(c.primaryColor, c.secondaryColor, pos);
    }
};