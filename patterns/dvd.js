import { lerpRGB } from "../engine/color.js";
import { remap } from "../engine/math.js";

export default {
    paletteType: "pair",
    palette: "Psych",
    config: {
        height: 5,
        width: 5,
    },
    global: (p, c, s) => {
        const MAX_SPEED = 7;
        const MIN_SPEED = 4;
        const speed = () => remap(Math.random(), 0, 1, MIN_SPEED, MAX_SPEED);
        if (!s.pos) {
            s.pos = {
                x: p.width / 2,
                y: p.height / 2,
            };
            s.vel = {
                x: speed() * (Math.random() > 0.5 ? -1 : 1),
                y: speed() * (Math.random() > 0.5 ? -1 : 1),
            };
        } else {
            s.pos.x += s.vel.x * p.deltaTime;
            s.pos.y += s.vel.y * p.deltaTime;
            if (s.pos.x >= p.width - c.width * 0.75) {
                s.vel.x = speed() * -1;
                s.pos.x = p.width - c.width * 0.75;
            }
            if (s.pos.x <= c.width * 0.75) {
                s.vel.x = speed();
                s.pos.x = c.width * 0.75;
            }
            if (s.pos.y >= p.height - c.width * 0.5) {
                s.vel.y = speed() * -1;
                s.pos.y = p.height - c.width * 0.5;
            }
            if (s.pos.y <= c.width * 0.75) {
                s.vel.y = speed();
                s.pos.y = c.width * 0.75;
            }
        }
        return {
            pos: s.pos,
        };
    },
    pixel: (p, c, g) => {
        const y = Math.floor(p.pos.y / 3) * 3;
        const x = p.pos.x;
        let pos = 0;
        // if (x >= g.pos.x - c.width &&
        //     x <= g.pos.x + c.width &&
        //     y >= g.pos.y - c.height &&
        //     y <= g.pos.y + c.height) {
        //     pos = 1;
        // }
        for (let yi = 0; yi < 8; yi++) {
            for (let xi = 0; xi < 8; xi++) {
                const yy = y + (3 / 8) * yi;
                const xx = x + (3 / 8) * xi;
                if (xx >= g.pos.x - c.width &&
                    xx <= g.pos.x + c.width &&
                    yy >= g.pos.y - c.height &&
                    yy <= g.pos.y + c.height) {
                    pos += 1;
                }
            }
        }
        pos /= (8 * 8);
        return lerpRGB(p.palette.off, p.palette.on, pos);
    }
};