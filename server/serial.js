import { SerialPort } from 'serialport';
import { Buffer } from 'buffer';
import { GammaLookUp } from '../engine/gamma.js';
import { keyframes } from '../engine/math.js';

const SEP1 = "img start";
const SEP2 = "img end";

const QDH_FIX_LEDS_R = [
    0, 0,
    100, 118,
    200, 255,
];

const QDH_FIX_LEDS_G = [
    0, 0,
    100, 125,
    200, 255,
];

const QDH_FIX_LEDS_B = [
    0, 0,
    20, 0,
    50, 70,
    100, 118,
    180, 255,
];

export class SerialView {
    constructor(executor) {
        this.executor = executor;
        this.port = undefined;
        const port = new SerialPort({ path: "/dev/serial/by-id/usb-Teensyduino_USB_Serial_8157270-if00",
          baudRate: 115200
        }, () => {
            this.port = port;
            console.log("SerialPort opened!");
        });
        port.on('error', (err) => {
          console.log('Error: ', err.message)
        });
    }

    render() {
        // console.log("============================");
        this.executor.postProcess((p, j, data) => {
            if (p.pos.y === 20 || p.pos.y === 17 || p.pos.y === 16 || p.pos.y === 21 && p.pos.x > 40) {
                data[j + 0] = keyframes(QDH_FIX_LEDS_R, data[j + 0]);
                data[j + 1] = keyframes(QDH_FIX_LEDS_G, data[j + 1]);
                data[j + 2] = keyframes(QDH_FIX_LEDS_B, data[j + 2]);
            }
            data[j + 0] = GammaLookUp[data[j + 0]];
            data[j + 1] = GammaLookUp[data[j + 1]];
            data[j + 2] = GammaLookUp[data[j + 2]];

            // console.log((data[j + 0] << 16) + (data[j + 1] << 0) + (data[j + 2] << 8));
        });
        
        let buf = Buffer.from(this.executor.data.buffer);

        if (this.port) {
            this.port.write(SEP1);
            this.port.write(buf);
            this.port.write(SEP2);
        }
    }
}



