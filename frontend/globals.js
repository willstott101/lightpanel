import { executor } from "../engine/configured.js";
import { CanvasPixelView } from "./CanvasPixelView.js";

executor.addView("a", new CanvasPixelView(
    executor,
    {x: 0, y: 0}, // Start pos
    {x: 1, y: 1}, // Distance between pixels
));
executor.addView("b", new CanvasPixelView(
    executor,
    {x: 10, y: 0}, // Start pos
    {x: 1, y: 1}, // Distance between pixels
));

executor.start();

export {
    executor,
};
