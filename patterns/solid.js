import { lerpRGB } from "../engine/color.js";
import { remap } from "../engine/math.js";

export default {
    config: {
        primaryColor: {
            r: 240,
            g: 100,
            b: 25,
        },
    },
    pixel: (p, c, g) => {
        return c.primaryColor;
    }
};