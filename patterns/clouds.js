import gen from "random-seed";
import { createNoise3D } from 'simplex-noise';
import { lerpRGB } from "../engine/color.js";

export default {
    paletteType: "light",
    config: {
        period: 5,
    },
    global: (p, c) => {
        const prng = gen.create("seed");
        return {
            s: createNoise3D(prng.random),
        };
    },
    pixel: (p, c, g) => {
        const pos = g.s(p.time / 20 + p.pos.y / 5, p.time / 20 + p.pos.x / 50, p.time / 10) + 0.2;
        return lerpRGB(p.palette.off, p.palette.on, Math.sqrt(pos));
    }
};