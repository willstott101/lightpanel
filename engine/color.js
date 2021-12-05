import simpleColorConverter from 'simple-color-converter';
import { lerp, remap } from "./math.js";

export function rgb2yuv(c) {
    return new simpleColorConverter({
        rgb: c,
        to: 'yuv'
    }).color;
}

export function yuv2rgb(c) {
    return new simpleColorConverter({
        yuv: c,
        to: 'rgb'
    }).color;
}

export function rgb2cmyk(c) {
    return new simpleColorConverter({
        rgb: c,
        to: 'cmyk'
    }).color;
}

export function cmyk2rgb(c) {
    return new simpleColorConverter({
        cmyk: c,
        to: 'rgb'
    }).color;
}

export function lerpYUV(ac, bc, t) {
    return {
        y: lerp(ac.y, bc.y, t),
        u: lerp(ac.u, bc.u, t),
        v: lerp(ac.v, bc.v, t),
    };
}

export function lerpRGB(ac, bc, t) {
    return {
        r: lerp(ac.r, bc.r, t),
        g: lerp(ac.g, bc.g, t),
        b: lerp(ac.b, bc.b, t),
    };
}

export function lerpCMYK(ac, bc, t) {
    return {
        c: lerp(ac.c, bc.c, t),
        m: lerp(ac.m, bc.m, t),
        y: lerp(ac.y, bc.y, t),
        k: lerp(ac.k, bc.k, t),
    };
}

export function lerpRGBasYUV(ac, bc, t) {
    return yuv2rgb(lerpYUV(rgb2yuv(ac), rgb2yuv(bc), t));
}

export function lerpRGBasCMYK(ac, bc, t) {
    return cmyk2rgb(lerpCMYK(rgb2cmyk(ac), rgb2cmyk(bc), t));
}

export function grad(stops, pos) {
    if (pos <= stops[0])
        return stops[1];
    pos -= stops[0];
    if (pos >= stops[stops.length - 2])
        return stops[stops.length - 1];
    let idx = 0;
    const stopDist = () => stops[idx * 2 + 2] - stops[idx * 2];
    while (pos > stopDist()) {
        pos -= stopDist();
        idx++;
    }
    const p = remap(pos, 0, stopDist(), 0, 1);
    return lerpRGB(stops[idx * 2 + 1], stops[idx * 2 + 3], p);
}

export function hex(h) {
    return new simpleColorConverter({
        hex6: h,
        to: 'rgb'
    }).color;
}
