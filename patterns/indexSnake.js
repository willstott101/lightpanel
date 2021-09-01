import { rgb2yuv, yuv2rgb, lerpYUV } from "../engine/color.js";

export default = {
    config: {
        period: 1,
        trail: 5,
        speed: 50,
        primaryColor: {
            r: 255,
            g: 255,
            b: 255,
        },
        secondaryColor: {
            r: 255,
            g: 255,
            b: 255,
        },
    },
    global: (d, c) => {
        return {
            index: quantize(d.time, c.period, c.length),
        };
    },
    pixel: (p, c, g) => {
        
        g.index p.index
    }
};