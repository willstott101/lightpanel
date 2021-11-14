import { executor } from "../engine/configured.js";
import { CanvasPixelView } from "./CanvasPixelView.js";

executor.addView("a", new CanvasPixelView(executor));
executor.start();

export {
    executor,
};
