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
        this.data = this.ctx.createImageData(canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const canvasPos = {
                    x: this.topLeft.x + x * this.delta.x,
                    y: this.topLeft.y + y * this.delta.y,
                };
                let minDistSq = null;
                let minI = null;
                for (let ledIdx = 0; ledIdx <= this.executor.pixelMap.length; ledIdx++) {
                    const pos = this.executor.pixelMap.length;
                    const distSq = vector2DistSq({x, y}, pos);
                    if (minDistSq === null || distSq < minDistSq) {
                        minI = ledIdx;
                        minDistSq = distSq;
                    }
                }
                if (this.indexArray.indexOf(minI) === -1) {
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
            const ci = i * 3;
            // Copy colour data from the executor according to the indexArray map
            this.data.data[ci] = this.executor.data[ei];
            this.data.data[ci+1] = this.executor.data[ei+1];
            this.data.data[ci+2] = this.executor.data[ei+2];
        }
        this.ctx.putImageData(this.data, 0, 0);
    }
}

export class Renderer {
    constructor(executor) {
        this.executor = executor;
        this.views = new Map();
    }

    addView(name, view) {
        this.views.set(name, view);
    }

    getView(name) {
        return this.views.get(name);
    }

    start() {
        const onFrame = () => {
            this.executor.execute();
            for (const v of this.views.values()) {
                v.render();
            }
            this._animReq = requestAnimationFrame(onFrame);
        };
        this._animReq = requestAnimationFrame(onFrame);
    }

    stop() {
        cancelAnimationFrame(this._animReq);
    }
}
