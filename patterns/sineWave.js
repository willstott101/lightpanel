import { lerpRGBasYUV, lerpRGB } from "../engine/color.js";
import { quantize } from "../engine/math.js";

export default {
    config: {
        period: 10,
        scale: 10,
        thickness: 2,
        primaryColor: {
            r: 255,
            g: 0,
            b: 10,
        },
        secondaryColor: {
            r: 0,
            g: 70,
            b: 70,
        },
    },
    global: (p, c) => {
        let index = quantize(p.time, c.period, p.length);
        return {
            index,
        };
    },
    pixel: (p, c, g) => {
        let pos = 1
        const maths = c.scale*Math.sin((p.pos.x+g.index)/c.scale)+12
        if (maths > p.pos.y - c.thickness && maths < p.pos.y + c.thickness) {
            pos = 0.5
        }

        return lerpRGB(c.primaryColor, c.secondaryColor, pos);
    }
};