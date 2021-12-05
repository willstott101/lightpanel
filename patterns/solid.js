import { warmWhite } from "../engine/swatches.js";

export default {
    config: {
        primaryColor: warmWhite,
    },
    pixel: (p, c, g) => {
        return c.primaryColor;
    }
};