import SimplexNoise from "simplex-noise";
import { lerpRGB } from "../engine/color.js";
import { warmWhite, black } from "../engine/swatches.js";

export default {
    config: {
        period: 5,
        primaryColor: warmWhite,
        secondaryColor: black,
    },
    global: (p, c) => {
        return {
            s: new SimplexNoise('seed'),
        };
    },
    pixel: (p, c, g) => {
        const pos = g.s.noise2D(p.time / 10 + p.pos.y, p.pos.x);
        return lerpRGB(c.secondaryColor, c.primaryColor, pos);
    }
};