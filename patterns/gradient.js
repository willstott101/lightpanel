import { evenGrad } from "../engine/color.js";
import { remap } from "../engine/math.js";

export default {
    paletteType: "gradient",
    config: {
        // angle: 0,
    },
    pixel: (p, c, g) => {
        // const y = Math.round(p.pos.y / 2 + p.time * 2) % p.height;
        // let pos = remap(y, 0, p.height, 0, 2);
        // if (pos > 1) pos = 2 - pos;
        // return evenGrad(p.palette, pos);
        const pos = remap(p.pos.y, 0, p.height, 0, 1);
        return evenGrad(p.palette, pos);
    }
};