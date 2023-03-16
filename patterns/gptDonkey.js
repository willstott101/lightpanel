import { lerpRGB } from "../engine/color.js";

// please generate javascript code like above, to draw a donkey in the pixel function. p.pos is a 2d vector with x and y between p.width and p.height

export default {
    paletteType: "pair",
    config: {
        primaryColor: {
            r: 100,
            g: 150,
            b: 255,
        },
        secondaryColor: {
            r: 255,
            g: 100,
            b: 150,
        },
    },
    pixel: (p, c, g) => {
        const x = p.pos.x;
        const y = p.pos.y;

        const isBody = x > p.width * 0.3 && x < p.width * 0.7 && y > p.height * 0.4 && y < p.height * 0.6;
        const isHead = x > p.width * 0.7 && x < p.width * 0.8 && y > p.height * 0.3 && y < p.height * 0.5;
        const isLeg1 = x > p.width * 0.35 && x < p.width * 0.4 && y > p.height * 0.6 && y < p.height * 0.8;
        const isLeg2 = x > p.width * 0.6 && x < p.width * 0.65 && y > p.height * 0.6 && y < p.height * 0.8;

        const isDonkey = isBody || isHead || isLeg1 || isLeg2;

        return isDonkey ? c.primaryColor : c.secondaryColor;
    }
};
