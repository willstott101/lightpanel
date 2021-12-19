export function styleStringFromPalette(palette) {
    if (!palette)
        return "background: black;";
    console.log("palette", palette);
    if (!Array.isArray(palette)) {
        palette = Array.from(Object.values(palette));
    }
    let s = "background: linear-gradient(90deg, ";
    s += palette.map((e, idx, arr) => {
        const p = (i) => Math.round((100 / arr.length) * i);
        if (idx === 0)
            return `rgb(${e.r}, ${e.g}, ${e.b}) 0%`;
        return `rgb(${arr[idx - 1].r}, ${arr[idx - 1].g}, ${arr[idx - 1].b}) ${p(idx) - 1}%, rgb(${e.r}, ${e.g}, ${e.b}) ${p(idx)}%`;
    }).join(", ");
    return s + ");";
}