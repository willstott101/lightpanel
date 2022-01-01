import { hsl } from "../engine/color.js";

export default {
    paletteType: null,
    config: {
        speed: 25,
        size: 3,
    },
    pixel: (p, c, g) => {
        const pos = p.pos.x + p.pos.y;
        const hue = pos / c.size + p.time * c.speed;
        return hsl(hue % 360, 1, 0.5);
    }
};