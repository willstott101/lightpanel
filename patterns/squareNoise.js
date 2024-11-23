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
        const pos = g.s(p.time / 10 + Math.floor(p.pos.y / 3), p.pos.x);
        return lerpRGB(p.palette.off, p.palette.on, Math.sqrt(pos));
    }
};