import { executor } from "../engine/configured.js";
import { Communicator } from "../engine/Communicator.js";
import { CanvasPixelView } from "./CanvasPixelView.js";

executor.addView("a", new CanvasPixelView(executor));
executor.remoteControlled = true;
const controller = new Communicator(executor);

export {
    controller,
    executor,
};
