import { vector2DistSq } from "../engine/math.js";

export class CanvasPixelView {
    indexArray = [];
    constructor(executor) {
        this.executor = executor;
    }
    canvasReady(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        canvas.width = this.executor.width;
        canvas.height = this.executor.height;
        this.data = this.ctx.createImageData(this.executor.width, this.executor.height);

        this.indexArray = [];
        for (let ledIdx = 0; ledIdx < this.executor.pixelMap.length; ledIdx++) {
            const pix = this.executor.pixelMap[ledIdx];
            for (let y = 0; y < pix.height; y++) {
                for (let x = 0; x < pix.width; x++) {
                    const canvasIdx = pix.x + x + (pix.y + y) * this.executor.width;
                    this.indexArray[canvasIdx] = ledIdx;
                }
            }
        }
    }
    render() {
        if (!this.ctx)
            return;
        for (let i = 0; i < this.indexArray.length; i++) {
            const a = this.indexArray[i];
            if (a === undefined)
                continue;
            const ei = a * 3;
            const ci = i * 4;
            // Copy colour data from the executor according to the indexArray map
            this.data.data[ci] = this.executor.data[ei];
            this.data.data[ci+1] = this.executor.data[ei+1];
            this.data.data[ci+2] = this.executor.data[ei+2];
            this.data.data[ci+3] = 255;
        }
        this.ctx.putImageData(this.data, 0, 0);
    }
}