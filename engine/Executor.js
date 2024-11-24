import { horizontalScanPixelMap } from "./layout.js";
import patterns from "../patterns/index.js";
import * as allPalettes from "../engine/palettes.js";

const DEFAULT_BRIGHTNESS = 0.75;

export class Executor {
    pixelMap = [];
    data = new Uint8ClampedArray();
    constructor() {
        this.views = new Map();
        this._startTime = this._now();
        this._lastTime = this._startTime;
        this._stopTime = undefined;
        this._maxBrightness = DEFAULT_BRIGHTNESS;
        this._whiteBalance = 0
        this._whiteBalanceMultiplier = {
            r: 1,
            g: 1,
            b: 1
        }
        this._on = true;
        this.width = 0;
        this.height = 0;
        this.pixelWidth = 0;
        this.pixelHeight = 0;
        this._running = false;
        this._listeners = new Set();
        this.remoteControlled = false;
        this.patchName = "Noise";
    }

    addView(name, view) {
        this.views.set(name, view);
    }

    getView(name) {
        return this.views.get(name);
    }

    addHorizontalScan(count, startPos, size, xCount) {
        horizontalScanPixelMap(
            this.pixelMap, count, startPos, size, xCount);
        const oldData = this.data;
        this.data = new Uint8ClampedArray(this.pixelMap.length * 3);
        this.data.set(oldData, 0);
        this._refreshSize();
    }

    _refreshSize() {
        this.width = this.pixelMap.reduce((v, p) => {
            const m = p.x + p.width - 1;
            return m > v ? m : v;
        }, 0);
        // TODO: QDH here
        this.pixelWidth = this.width / 3;
        this.height = this.pixelMap.reduce((v, p) => {
            const m = p.y + p.height - 1;
            return m > v ? m : v;
        }, 0);
        this.pixelHeight = this.height;
    }

    addListener(listener) {
        this._listeners.add(listener);
    }
    _fireChange(field) {
        const msg = this._changeMsg(field);
        for (const listener of this._listeners)
            listener(msg);
    }
    _fireExec(data) {
        const msg = {
            "type": "exec",
            "data": data,
        };
        for (const listener of this._listeners)
            listener(msg);
    }

    _changeMsg(field) {
        return {
            "type": "change",
            "data": {
                "field": field,
                "value": this[field]
            },
        };
    }

    control(msg) {
        if (msg.type === "exec") {
            this.execute(msg.data);
        } else if (msg.type === "change") {
            this[msg.data.field] = msg.data.value;
        } else if (msg.type === "start") {
            this.start();
        } else if (msg.type === "stop") {
            this.stop();
        }
        // for (const listener of this._listeners)
        //     listener(msg);
    }

    getSyncMessages() {
        return [
            this._changeMsg("on"),
            this._changeMsg("running"),
            this._changeMsg("maxBrightness"),
            this._changeMsg("whiteBalance"),
            this._changeMsg("patchName"),
            this._changeMsg("paletteName"),
        ];
    }

    execute(time) {
        const p = {
            time: time || (new Date()).getTime() / 1000,
            length: this.pixelMap.length,
            width: this.width,
            height: this.height,
            pixelWidth: this.pixelWidth,
            pixelHeight: this.pixelHeight,
            palette: this._palette,
        };
        p.deltaTime = p.time - this._lastTime;
        if (this._maxBrightness > 0 && this._on) {
            let g;
            const patch = patterns[this._patchName];
            if (patch.global)
                g = patch.global(p, this._config, this._state);
            for (let i = 0; i < p.length; i++) {
                p.pos = this.pixelMap[i];
                p.index = i;
                const color = patch.pixel(p, this._config, g);
                const j = i * 3;
                this.data[j + 0] = color.r * this._whiteBalanceMultiplier.r;
                this.data[j + 1] = color.g * this._whiteBalanceMultiplier.g;
                this.data[j + 2] = color.b * this._whiteBalanceMultiplier.b;
            }

            if (this._maxBrightness !== 1) {
                this._scaleBrightness();
            }
        } else {
            this._clear();
        }
        this._fireExec(Math.round(p.time * 1000) / 1000);
        this._lastTime = p.time;
        for (const v of this.views.values()) v.render();
    }

    postProcess(fn) {
        const p = {
            length: this.pixelMap.length,
            width: this.width,
            height: this.height,
            pixelWidth: this.pixelWidth,
            pixelHeight: this.pixelHeight,
        };
        for (let i = 0; i < p.length; i++) {
            p.pos = this.pixelMap[i];
            p.index = i;
            const j = i * 3;
            fn(p, j, this.data);
        }
    }

    _clear() {
        for (let i = 0; i <= this.data.length; i++)
            this.data[i] = 0;
    }

    _clampBrightness() {
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

    _scaleBrightness() {
        const scale = this._maxBrightness;
        for (let p = 0; p <= this.pixelMap.length; p++) {
            const i = p * 3;
            this.data[i] *= scale;
            this.data[i + 1] *= scale;
            this.data[i + 2] *= scale;
        }
    }

    get maxBrightness() {
        return this._maxBrightness;
    }

    set maxBrightness(val) {
        this._maxBrightness = val;
        this._fireChange("maxBrightness");
        if (!this.running)
            this.runOnce();
    }

    get on() {
        return this._on;
    }

    set on(val) {
        this._on = val;
        this._fireChange("on");
        if (this._maxBrightness === 0 && val) {
            this.maxBrightness = DEFAULT_BRIGHTNESS;
        }
        if (!this.running)
            this.runOnce();
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
        this._fireChange("whiteBalance");
        if (!this.running)
            this.runOnce();
    }

    get running() {
        return this._running;
    }

    set running(val) {
        this._running = val;
        this._fireChange("running");
    }

    get patchName() {
        return this._patchName;
    }

    set patchName(val) {
        this._patchName = val;
        const pattern = patterns[this._patchName];
        const paletteType = pattern.paletteType || "pair";
        this.palettes = allPalettes[paletteType];
        this._config = pattern.config;
        this._state = {};
        this._fireChange("patchName");
        this.paletteName = pattern.palette || this.palettes.__default;
    }

    get paletteName() {
        return this._paletteName;
    }

    set paletteName(val) {
        this._paletteName = val;;
        this._palette = this.palettes[this._paletteName];
        this._fireChange("paletteName");
        if (!this.running)
            this.runOnce();
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
    }

    start() {
        this._resumeTime();
        if (typeof window === 'undefined') {
            this._animReq = setInterval(this._doFrame.bind(this), (1 / 45) * 1000);
        } else {
            const onFrame = () => {
                this._doFrame();
                this._animReq = requestAnimationFrame(onFrame);
            };
            this._animReq = requestAnimationFrame(onFrame);
        }
        this.running = true;
        this._fireChange("running");
    }

    stop() {
        this._pauseTime();
        if (typeof window === 'undefined') {
            clearInterval(this._animReq);
        } else {
            cancelAnimationFrame(this._animReq);
        }
        this.running = false;
        this._fireChange("running");
        this.runOnce();
    }

    runOnce() {
        if (this.remoteControlled) return; // The server will tell us when to render.
        const time = this._stopTime ? this._lastTime : this._now();
        this.execute(time);
    }
}