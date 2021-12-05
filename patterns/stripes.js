import { lerpRGB } from "../engine/color.js";
import { remap } from "../engine/math.js";
import { warmWhite, black } from "../engine/swatches.js";

export default {
    config: {
        height: 5,
        width: 5,
        primaryColor: warmWhite,
        secondaryColor: black,
    },
    pixel: (p, c, g) => {
        if (p.pos.y % 4 > 1) {
            return c.primaryColor;
        }
        return c.secondaryColor;
    }
};