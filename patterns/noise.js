import SimplexNoise from "simplex-noise";
import { lerpRGB } from "../engine/color.js";

export default {
    paletteType: "light",
    config: {
        period: 5,
    },
    global: (p, c) => {
        return {
            s: new SimplexNoise('seed'),
        };
    },
    pixel: (p, c, g) => {
        const pos = g.s.noise2D(p.time / 10 + p.pos.y, p.pos.x);
        return lerpRGB(p.palette.off, p.palette.on, pos);
    }
};