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
        return {
            heights,
        };
    },
    pixel: (p, c, g) => {
        if (p.pos.y <= g.heights[p.pos.x / 3]) {
            return c.buildingColor;
        }
        const pos = remap(p.pos.y, 0, p.height, 0, 1);
        return grad([0.35, p.palette[2], 0.9, p.palette[1], 1, p.palette[0]], pos);
    }
};