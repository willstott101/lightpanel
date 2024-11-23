import gen from "random-seed";
import { createNoise2D } from 'simplex-noise';
import * as color from "../engine/color.js";
import {randomChoice} from "../engine/math.js";

export default {
    paletteType: "gradient",
    config: {
        period: 5,
    },
    global: (p, c, s) => {
        const prng = gen.create("seed");
        if (!s.colors)
            s.colors = [];
        for (let x = 0; x < c.width; x++) {
            for (let y = 0; y < c.height; y++) {
                s.colors[i++] = undefined;
            }
        }
        return {
            s: createNoise2D(prng.random),
            colors: s.colors,
        };
    },
    pixel: (p, c, g) => {
        const pos = g.s(p.time / 10 + p.pos.y, p.pos.x);
        if (pos > 0) {
            if (g.colors[p.index] === undefined) {
                g.colors[p.index] = randomChoice(p.palette);
            }
        } else {
            g.colors[p.index] = undefined;
        }
        if (p.index === 1) {
            console.log("pos", pos, "col", g.colors[p.index]);
        }
        if (g.colors[p.index])
            return color.lerpRGB({r: 0, g: 0, b: 0}, g.colors[p.index], Math.sqrt(pos));
        else
            return {r: 0, g: 0, b: 0};
    }
};