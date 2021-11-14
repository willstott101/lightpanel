import { Executor } from "../engine/Executor.js";

export const executor = new Executor(80);
executor.addHorizontalScan(
    400, // Num LED pixels
    {x: 0, y: 0}, // Start pos
    {x: 3, y: 1}, // Size of LEDs (and distance)
    16, // Count per row
);
