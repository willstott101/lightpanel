import { hex } from "./color.js";
import { kelvin2RGB } from "./kelvin.js";

export const light = {
    __default: "Warm",
    Warm: {
        off: hex("#000000"),
        on: kelvin2RGB[2900],
    },
    Daylight: {
        off: hex("#000000"),
        on: kelvin2RGB[5000],
    },
    Bright: {
        off: hex("#000000"),
        on: hex("#ffffff"),
    },
    Matrix: {
        off: hex("#000000"),
        on: hex("#00AA00"),
    },
    Pink: {
        off: hex("#000000"),
        on: hex("#FF8888"),
    },
};

export const pair = {
    __default: "Psych",
    Psych: {
        off: hex("#E1341E"),
        on: hex("#1ECBE1"),
    },
    Love: {
        off: hex("#F90689"),
        on: hex("#06F976"),
    },
    Robe: {
        off: hex("#8923DC"),
        on: hex("#76DC23"),
    },
    ...light,
};

export const palette = {
    __default: "Pastel Rainbow",
    Primary: [
        hex("#FF0000"),
        hex("#00FF00"),
        hex("#0000FF"),
    ],
    Secondary: [
        hex("#FFFF00"),
        hex("#FF00FF"),
        hex("#00FFFF"),
    ],
    CMYK: [
        hex("#00FFFF"),
        hex("#FF00FF"),
        hex("#FFFF00"),
        hex("#000000"),
    ],
    Tertiary: [
        hex("#FF8000"),
        hex("#80FF00"),
        hex("#00FF80"),
        hex("#0080FF"),
        hex("#8000FF"),
        hex("#FF0080"),
    ],
    "Pastel Rainbow": [
        hex("#FF8080"),
        hex("#FFFF80"),
        hex("#80FF80"),
        hex("#FF80FF"),
        hex("#80FFFF"),
        hex("#8080FF"),
    ],
};

// Three-part gradient suitable for a sky (top-down)
export const sky = {
    __default: "Vintage Sunset",
    "Vintage Sunset": [
        hex("#5dc3cf"),
        hex("#fc9803"),
        hex("#4c008f"),
    ],
    Morning: [
        hex("#EEAAFF"),
        hex("#8877FF"),
        hex("#FF3000"),
    ],
};

export const gradient = {
    ...sky,
    __default: "Morning",
    Secondary: palette["Secondary"],
    Tertiary: palette["Tertiary"],
    "Pastel Rainbow": palette["Pastel Rainbow"],
    Psych: [pair.Psych.on, pair.Psych.off],
};