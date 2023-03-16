import { lerpRGB } from "../engine/color.js";

// > Gave it an example file with a tiny bit of explaination
// Given this code snippet please generate a new pretty effect
// > Some extra docs
// The p parameter is defined like this, please use p.time to make the gradient move.

export default {
    paletteType: "pair",
    config: {
        speed: 5, // Increase speed for a faster-moving gradient
        frequency: 0.1,
        amplitude: 30,
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
        const wave = c.amplitude * Math.sin(p.pos.x * c.frequency + p.time * c.speed);

        const distanceFromWave = Math.abs(p.pos.y - (p.height / 2 + wave));
        const normalizedDistance = distanceFromWave / p.height;

        const t = (Math.sin(p.time * c.speed) + 1) / 2; // Calculate a moving value between 0 and 1 based on p.time
        return lerpRGB(c.primaryColor, c.secondaryColor, t * normalizedDistance);
    }
};