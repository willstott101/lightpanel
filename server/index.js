import { executor } from "../engine/configured.js";
import { SerialView } from "./serial.js";

executor.addView("a", new SerialView(executor, 48));
executor.start();
