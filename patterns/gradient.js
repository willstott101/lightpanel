import { evenGrad } from "../engine/color.js";
import { remap } from "../engine/math.js";

export default {
    paletteType: "gradient",
    config: {
        // angle: 0,
    },
    pixel: (p, c, g) => {
        const pos = remap(p.pos.x, 0, p.width, 0, 1);
        return evenGrad(p.palette, pos);
    }
};