import { grad } from "../engine/color.js";
import { remap } from "../engine/math.js";
import gen from "random-seed";

export default {
    paletteType: "sky",
    config: {
        period: 5,
        buildingColor: {
            r: 0,
            g: 0,
            b: 0,
        },
    },
    global: (p, c) => {
        const heights = [];
        for (let i = 0; i < p.pixelWidth; i++) {
            const prng = gen.create(`${Math.floor(p.time / c.period) + i}`);
            heights[i] = (Math.pow(prng.random(), 3) + 0.2) * p.pixelHeight;
        }
        const offsets = [];
        for (let i = 0; i < p.pixelHeight; i++) {
            const prng = gen.create(`${Math.floor(p.time / c.period) + i}`);
            offsets[i] = (Math.pow(prng.random(), 3) + 0.2);
        }
        return {
            heights,
            offsets,
        };
    },
    pixel: (p, c, g) => {
        if (p.pos.y <= g.heights[p.pos.x / 3]) {
            return c.buildingColor;
        }
        const offset = g.offsets[p.index % g.offsets.length] * 0.05;
        const pos = remap(p.pos.y, 0, p.height, 0, 1) + offset;
        return grad([0.25, p.palette[2], 0.65, p.palette[1], 1, p.palette[0]], pos);
    }
};