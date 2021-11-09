import { horizontalZigZagPixelMap } from "./layout.js";
import defaultPattern from "../patterns/indexSnake.js";

export class Executor {
    pixelMap = [];
    data = new Uint8ClampedArray();
    constructor(targetFps = 60) {
        this.views = new Map();
        this._patch = defaultPattern;
        this._config = defaultPattern.config;
        this._interval_ms = (1 / targetFps) * 1000;
        this._startTime = this._now();
        this._lastTime = this._startTime;
        this._stopTime = undefined;
        this._maxBrightness = 0.75;
        this._whiteBalance = 0
        this._whiteBalanceMultiplier = {
            r: 1,
            g: 1,
            b: 1
        }
    }

    addView(name, view) {
        this.views.set(name, view);
    }

    getView(name) {
        return this.views.get(name);
    }

    addHorizontalZigZag(count, startPos, xDist, yDist, xCount) {
        horizontalZigZagPixelMap(
            this.pixelMap, this.pixelMap.length, count, startPos, xDist, yDist, xCount);
        const oldData = this.data;
        this.data = new Uint8ClampedArray(this.pixelMap.length * 3);
        this.data.set(oldData, 0);
    }

    execute(time) {
        if (this._maxBrightness > 0) {
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
                p.pos = this.pixelMap[i];
                p.index = i;
                const color = this._patch.pixel(p, this._config, g);
                const j = i * 3;
                this.data[j + 0] = color.r * this._whiteBalanceMultiplier.r;
                this.data[j + 1] = color.g * this._whiteBalanceMultiplier.g;
                this.data[j + 2] = color.b * this._whiteBalanceMultiplier.b;
            }

            if (this._maxBrightness < 1) {
                this._reduceBrightness();
            }
        } else {
            this._clear();
        }
        this._lastTime = time;
    }

    _clear() {
        for (let i = 0; i <= this.data.length; i++)
            this.data[i] = 0;
    }

    _reduceBrightness() {
        const max = this._maxBrightness * 255 * 3;
        for (let p = 0; p <= this.pixelMap.length; p++) {
            const i = p * 3;
            const total = this.data[i] + this.data[i + 1] + this.data[i + 2];
            if (total > max) {
                const scale = max / total;
                this.data[i] *= scale;
                this.data[i + 1] *= scale;
                this.data[i + 2] *= scale;
            }
        }
    }

    get maxBrightness() {
        return this._maxBrightness;
    }

    set maxBrightness(val) {
        this._maxBrightness = val;
    }

    get whiteBalance() {
        return this._whiteBalance;
    }

    set whiteBalance(val) {
        this._whiteBalanceMultiplier = {
            r: 255 / (255 - 255 * (val*0.10)),
            g: 255 / (255 - 255 * (val*0.03)),
            b: 255 / (255 - 255 * (val*0.04))
        }
        this._whiteBalance = val;
    }

    _now() {
        const now = (new Date()).getTime() / 1000;
        return now - (this._startTime || 0);
    }

    _resumeTime() {
        if (this._stopTime) {
            this._startTime += this._now() - this._stopTime;
            this._stopTime = undefined;
            return true;
        }
        this._startTime = this._now();
        return false;
    }

    _pauseTime() {
        this._stopTime = this._now();
    }

    _doFrame() {
        this.execute(this._now());
        for (const v of this.views.values()) v.render();
    }

    start() {
        this._resumeTime();
        if (typeof window === 'undefined') {
            this._animReq = setInterval(this._doFrame, this._interval_ms);
        } else {
            const onFrame = () => {
                this._doFrame();
                this._animReq = requestAnimationFrame(onFrame);
            };
            this._animReq = requestAnimationFrame(onFrame);
        }
    }

    stop() {
        this._pauseTime();
        if (typeof window === 'undefined') {
            clearInterval(this._animReq);
        } else {
            cancelAnimationFrame(this._animReq);
        }
    }

    runOnce() {
        const time = this._stopTime ? this._lastTime : this._now();
        this.execute(time);
        for (const v of this.views.values()) v.render();
    }
}