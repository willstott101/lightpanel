export default {
    paletteType: "pair",
    palette: "Warm",
    config: {
        height: 5,
        width: 5,
    },
    pixel: (p, c, g) => {
        if (p.pos.y % 4 > 1) {
            return p.palette.on;
        }
        return p.palette.off;
    }
};