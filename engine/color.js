import simpleColorConverter from 'simple-color-converter';
import { lerp } from "./math.js";

export function rgb2yuv(c) {
    return new simpleColorConverter({
        rgb: c,
        to: 'yuv'
    });
}

export function yuv2rgb(c) {
    return new simpleColorConverter({
        yuv: c,
        to: 'rgb'
    });
}

export function rgb2cmyk(c) {
    return new simpleColorConverter({
        rgb: c,
        to: 'cmyk'
    });
}

export function cmyk2rgb(c) {
    return new simpleColorConverter({
        cmyk: c,
        to: 'rgb'
    });
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