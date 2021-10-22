import { lerpRGBasYUV, lerpRGB } from "../engine/color.js";
import { quantize } from "../engine/math.js";

export default {
    config: {
        period: 100,
        scale: 5,
        move: true,
        primaryColor: {
            r: 255,
            g: 0,
            b: 120,
        },
        secondaryColor: {
            r: 0,
            g: 140,
            b: 140,
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
        const variants = 0.5
        if (c.move) {
            const maths = c.scale*Math.sin((p.pos.x+g.index)/c.scale)+12
            if (maths > p.pos.y-variants && maths < p.pos.y+variants) {
                pos = 0
            }
        } else {
            const maths = c.scale*Math.sin(p.pos.x/c.scale)+12
            if (maths > p.pos.y-variants && maths < p.pos.y+variants) {
                pos = 0
            }
        }

        // return lerpRGBasYUV(c.primaryColor, c.secondaryColor, pos);
        return lerpRGB(c.primaryColor, c.secondaryColor, pos);
    }
};