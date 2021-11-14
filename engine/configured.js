import { Executor } from "../engine/Executor.js";

export const executor = new Executor(60);
executor.addHorizontalScan(
    375, // Num LED pixels
    {x: 0, y: 0}, // Start pos
    {x: 3, y: 1}, // Distance between LEDs
    15, // Count per row
);
