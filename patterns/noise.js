import gen from "random-seed";
import { createNoise2D } from 'simplex-noise';
import { lerpRGB } from "../engine/color.js";

export default {
    paletteType: "light",
    config: {
        period: 5,
    },
    global: (p, c) => {
        const prng = gen.create("seed");
        return {
            s: createNoise2D(prng.random),
        };
    },
    pixel: (p, c, g) => {
        const pos = g.s(p.time / 10 + p.pos.y, p.pos.x);
        return lerpRGB(p.palette.off, p.palette.on, Math.sqrt(pos) + 0.3);
    }
};