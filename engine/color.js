import simpleColorConverter from 'simple-color-converter';
import { lerp } from "./math.js";

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
