export function remap(t, min, max, targetMin, targetMax) {
    const startRange = (max - min);
    const targetRange = (targetMax - targetMin);
    return (((t - min) / startRange) * targetRange) + targetMin;
}

export function sawWave(t, period = 1, min = 0, max = 255, offset = 0) {
    t = (t + (offset * period)) % period;
    return remap(t, 0, period, min, max);
}

export function sinWave(t, period = 1, min = 0, max = 255, offset = 0) {
    t = (t + (offset * period)) % period;
    return remap(Math.sin(remap(t, 0, period, 0, Math.PI), -1, 1, min, max);
}

export function quantize(t, period = 1, max = 0, offset = 0) {
    t = ((t + offset) / period);
    if (max) t %= max;
    return Math.floor(t);
}

export function lerp(a, b, t) {
    return a + ((b - a) * t);
}