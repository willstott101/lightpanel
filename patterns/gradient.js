import { lerpRGB } from "../engine/color.js";

export default {
    config: {
        primaryColor: {
            r: 255,
            g: 120,
            b: 120,
        },
        secondaryColor: {
            r: 0,
            g: 140,
            b: 140,
        },
    },
    pixel: (p, c, g) => {
        // TODO: We need to know the height
        const pos = 1;
        return lerpRGB(c.primaryColor, c.secondaryColor, pos);
    }
};