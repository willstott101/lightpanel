import { lerpRGB } from "../engine/color.js";

// great, can you now generate a completely new effect in the style of dwitter snippets with more colors, that is compatible with the format above

export default {
    paletteType: "pair",
    config: {
        speed: 25,
        scale: 20,
        primaryColor: {
            r: 255,
            g: 183,
            b: 197,
        },
        secondaryColor: {
            r: 182,
            g: 215,
            b: 255,
        },
        tertiaryColor: {
            r: 161,
            g: 255,
            b: 206,
        },
    },
    pixel: (p, c, g) => {
        const x = p.pos.x;
        const y = p.pos.y;
        const t = p.time * c.speed;

        const wave1 = Math.sin((x + t) / c.scale) * c.scale;
        const wave2 = Math.sin((y + t) / c.scale) * c.scale;
        const wave3 = Math.sin((x + y + t) / c.scale) * c.scale;

        const distance1 = Math.abs(y - wave1);
        const distance2 = Math.abs(x - wave2);
        const distance3 = Math.abs((x + y) / 2 - wave3);

        let color;
        if (distance1 < 5) {
            color = c.primaryColor;
        } else if (distance2 < 5) {
            color = c.secondaryColor;
        } else if (distance3 < 5) {
            color = c.tertiaryColor;
        } else {
            color = { r: 0, g: 0, b: 0 };
        }

        return color;
    }
};
