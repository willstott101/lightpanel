export class Communicator {
    constructor(executor) {
        this._executor = executor;
        this._connect();
    }

    _connect() {
        // const url = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/ws`;
        const url = `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.hostname}:8080/ws`;
        // const url = `ws://localhost:8080/ws`;

        this._ws = new WebSocket(url);

        this._ws.addEventListener('message', (event) => {
            this._executor.control(JSON.parse(event.data));
        });

        this._ws.addEventListener('close', (event) => {
            console.log("CLOSE:", event);
            setTimeout(() => {
                this._connect();
            }, 1000 + Math.random() * 500);
        });
    }

    get maxBrightness() {
        throw "Woah there space cowboy."
    }

    set maxBrightness(val) {
        if (this._ws.readyState !== 1) return;
        this._ws.send(JSON.stringify({
            type: "change",
            data: {
                field: "maxBrightness",
                value: val
            },
        }));
    }

    get whiteBalance() {
        throw "Woah there space cowboy."
    }

    set whiteBalance(val) {
        if (this._ws.readyState !== 1) return;
        this._ws.send(JSON.stringify({
            type: "change",
            data: {
                field: "whiteBalance",
                value: val
            },
        }));
    }

    get on() {
        throw "Woah there space cowboy."
    }

    set on(val) {
        if (this._ws.readyState !== 1) return;
        this._ws.send(JSON.stringify({
            type: "change",
            data: {
                field: "on",
                value: val
            },
        }));
    }

    start() {
        if (this._ws.readyState !== 1) return;
        this._ws.send(JSON.stringify({
            type: "start"
        }));
    }

    stop() {
        if (this._ws.readyState !== 1) return;
        this._ws.send(JSON.stringify({
            type: "stop"
        }));
    }
}