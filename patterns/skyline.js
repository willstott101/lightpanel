import { lerpRGB, grad, hex } from "../engine/color.js";
import { remap } from "../engine/math.js";
import gen from "random-seed";

export default {
    config: {
        period: 5,
        // skyColor: {
        //     r: 70,
        //     g: 50,
        //     b: 250,
        // },
        // midColor: {
        //     r: 150,
        //     g: 100,
        //     b: 100,
        // },
        // horizonColor: {
        //     r: 255,
        //     g: 40,
        //     b: 10,
        // },
        skyColor: hex('#AA11FF'),
        midColor: hex('#8877FF'),
        horizonColor: hex('#FF1900'),
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
        return grad([0.35, c.horizonColor, 0.9, c.midColor, 1, c.skyColor], pos);
    }
};