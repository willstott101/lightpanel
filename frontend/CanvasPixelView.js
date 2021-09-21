import { vector2DistSq } from "../engine/math.js";

export class CanvasPixelView {
    indexArray = [];
    constructor(executor, topLeft = {x: 0, y: 0}, delta = {x: 1, y: 1}) {
        this.executor = executor;
        this.topLeft = topLeft;
        this.delta = delta;
    }
    canvasReady(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.indexArray = [];
        this.data = this.ctx.createImageData(canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const canvasPos = {
                    x: this.topLeft.x + (x * this.delta.x),
                    y: this.topLeft.y + (y * this.delta.y),
                };
                let minDistSq = null;
                let minI = null;
                for (let ledIdx = 0; ledIdx < this.executor.pixelMap.length; ledIdx++) {
                    const pos = this.executor.pixelMap[ledIdx];
                    const distSq = vector2DistSq(canvasPos, pos);
                    if (minDistSq === null || distSq < minDistSq) {
                        minI = ledIdx;
                        minDistSq = distSq;
                        if (distSq === 0)
                            break; // Don't bother looping.
                    }
                }
                // If this index is already used, don't re-use it.
                if (this.indexArray.indexOf(minI) !== -1) {
                    minI = undefined;
                }
                const canvasIdx = x + y * canvas.width;
                this.indexArray[canvasIdx] = minI;
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