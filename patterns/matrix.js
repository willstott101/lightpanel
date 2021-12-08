import { lerpRGB } from "../engine/color.js";
import { remap } from "../engine/math.js";

export default {
    paletteType: "pair",
    palette: "Matrix",
    config: {
        trail: 20,
    },
    global: (p, c, s) => {
        const DENSITY = 0.015;
        const MIN_SPEED = 0.1;
        const MAX_SPEED = 2;
        const MIN_BRIGHTNESS = 0.1;
        if (!s.vals) s.vals = [];
        for (let x = 0; x < p.pixelWidth; x++) {
            const vals = s.vals[x] || (s.vals[x] = []);
            for (let i = 0; i < vals.length; i++) {
                vals[i].pos -= vals[i].vel;
                if (vals[i].pos < -c.trail) {
                    vals.splice(i, 1);
                    i--;
                }
            }
            if (Math.random() > 1 - DENSITY) {
                const r = Math.random();
                vals.push({
                    pos: p.pixelHeight,
                    vel: remap(Math.pow(r, 4), 0, 1, MIN_SPEED, MAX_SPEED),
                    brightness: remap(Math.pow(r, 2), 0, 1, MIN_BRIGHTNESS, 1),
                    trail: remap(r, 0, 1, c.trail, 2),
                });
            }
        }
        return {
            vals: s.vals,
        };
    },
    pixel: (p, c, g) => {
        const vals = g.vals[p.pos.x / 3];
        let pos = 0;
        for (var i = vals.length - 1; i >= 0; i--) {
            const v = vals[i];
            if (v.pos > p.pos.y) continue;
            pos = Math.max(pos, remap(p.pos.y - v.pos, 0, v.trail, v.brightness, 0));
        }
        if (pos > 1)
            return c.letter;
        return lerpRGB(p.palette.on, p.palette.off, 1 - pos);
    }
};