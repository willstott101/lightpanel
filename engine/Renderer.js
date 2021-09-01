class Executor {
    pixelMap = [];
    data = new Uint8Array();
    constructor() {
        this._patch = snake;
        this._config = snake.config;
    }

    addHorizontalZigZag(count, startPos, xDist, yDist, xCount) {
        horizontalZigZagPixelMap(
            this.pixelMap, this.pixelMap.length, count, startPos, xDist, yDist, xCount);
    }

    execute(time) {
        if (time === undefined) {
            time = (new Date()).getTime();
        }
        const p = {
            time: time,
            random: Math.random(),
            length: this.pixelMap.length,
        };
        let g;
        if (this._patch.global)
            g = this._patch.global();
        for (let i = 0; i < p.length; i++) {
            const pixelData = this.pixelMap[i];
            this._patch.pixel(Object.assign(p, {
                pos: pixelData,
                index: i,
            }), this._config, g);
            const j = i * 3;
            data[j + 0] = color.r;
            data[j + 1] = color.g;
            data[j + 2] = color.b;
        }
    }
}