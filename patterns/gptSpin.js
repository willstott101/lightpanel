import { lerpRGB } from "../engine/color.js";

// use that same color scheme in another completely new honeycomb tunnel pattern

export default {
    paletteType: "pair",
    config: {
        speed: 7,
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

        const centerX = p.width / 2;
        const centerY = p.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) + t;

        const honeycombRadius = c.scale;
        const honeycombAngle = (Math.PI * 2) / 6;
        const honeycombOffset = honeycombRadius * Math.cos(honeycombAngle / 2);

        const row = Math.round(distance / honeycombOffset);
        const col = Math.round(angle / honeycombAngle);

        const isHoneycombBorder = (row + col) % 2 === 0;

        let color;
        if (isHoneycombBorder) {
            const colorRatio = (row + col) % 6 / 5;
            color = lerpRGB(c.primaryColor, lerpRGB(c.secondaryColor, c.tertiaryColor, 0.5), colorRatio);
        } else {
            color = { r: 0, g: 0, b: 0 };
        }

        return color;
    }
};
