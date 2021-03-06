import { lerpRGB } from "../engine/color.js";

export default {
    paletteType: "pair",
    config: {
        speed: 20,
        scale: 10,
        thickness: 2,
        primaryColor: {
            r: 255,
            g: 0,
            b: 10,
        },
        secondaryColor: {
            r: 0,
            g: 70,
            b: 70,
        },
    },
    pixel: (p, c, g) => {
        let pos = 1
        const maths = c.scale*Math.sin((p.pos.x+p.time * c.speed)/c.scale)+12
        if (maths > p.pos.y - c.thickness && maths < p.pos.y + c.thickness) {
            pos = 0.5
        }
        return lerpRGB(p.palette.on, p.palette.off, pos);
    }
};