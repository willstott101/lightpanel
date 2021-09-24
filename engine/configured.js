import { Executor } from "../engine/Executor.js";

export const executor = new Executor(60);
executor.addHorizontalZigZag(
    1200, // Num LEDs
    {x: 0, y: 0}, // Start pos
    {x: 1, y: 1}, // Distance between LEDs
    48, // Count per row
);
