import { Executor } from "../engine/Executor.js";
import { Renderer, CanvasPixelView } from "./renderer.js";


export const executor = new Executor();
executor.addHorizontalZigZag(
    150, // Num LEDs
    {x: 0, y: 0}, // Start pos
    {x: 1, y: 1}, // Distance between LEDs
    60, // Row count
);


export const renderer = new Renderer(executor);
renderer.addView("a", new CanvasPixelView(
    executor,
    {x: 0, y: 0}, // Start pos
    {x: 1, y: 1}, // Distance between pixels
));
renderer.addView("b", new CanvasPixelView(
    executor,
    {x: 10, y: 0}, // Start pos
    {x: 1, y: 1}, // Distance between pixels
));

// debugger;

renderer.start();

