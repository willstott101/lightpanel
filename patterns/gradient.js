import { lerpRGB } from "../engine/color.js";
import { remap } from "../engine/math.js";

export default {
    config: {
        primaryColor: {
            r: 255,
            g: 0,
            b: 0,
        },
        secondaryColor: {
            r: 0,
            g: 255,
            b: 255,
        },
    },
    pixel: (p, c, g) => {
        const pos = remap(p.pos.x, 0, p.width, 0, 1);
        return lerpRGB(c.primaryColor, c.secondaryColor, pos);
    }
};