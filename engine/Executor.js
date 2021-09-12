import { horizontalZigZagPixelMap } from "./layout.js";
import indexSnake from "../patterns/indexSnake.js";

export class Executor {
    pixelMap = [];
    data = new Uint8Array();
    constructor() {
        this._patch = indexSnake;
        this._config = indexSnake.config;
    }

    addHorizontalZigZag(count, startPos, xDist, yDist, xCount) {
        horizontalZigZagPixelMap(
            this.pixelMap, this.pixelMap.length, count, startPos, xDist, yDist, xCount);
        const oldData = this.data;
        this.data = new Uint8Array(this.pixelMap.length * 3);
        this.data.set(oldData, 0);
    }

    execute(time) {
        if (time === undefined) {
            time = (new Date()).getTime() / 1000;
        }
        const p = {
            time: time,
            random: Math.random(),
            length: this.pixelMap.length,
        };
        let g;
        if (this._patch.global)
            g = this._patch.global(p, this._config);
        for (let i = 0; i < p.length; i++) {
            const pixelData = this.pixelMap[i];
            const color = this._patch.pixel(Object.assign(p, {
                pos: pixelData,
                index: i,
            }), this._config, g);
            const j = i * 3;
            this.data[j + 0] = color.r;
            this.data[j + 1] = color.g;
            this.data[j + 2] = color.b;
        }
    }
}