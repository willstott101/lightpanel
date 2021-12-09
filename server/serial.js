import SerialPort from 'serialport';
// import { encode } from 'node-libpng';
import { Buffer } from 'buffer';
import { GammaLookUp } from '../engine/gamma.js';

const SEP = "SEPERATING TEXT";

export class SerialView {
    constructor(executor) {
        this.executor = executor;
        this.port = undefined;
        const port = new SerialPort("/dev/serial/by-id/usb-Teensyduino_USB_Serial_8157270-if00", {
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
        // let timeMs = (new Date()).getTime();

        this.executor.postProcess((p, j, data) => {
            if (p.pos.y === 20 || p.pos.y === 17 || p.pos.y === 16 || p.pos.y === 21 && p.pos.x > 40) {
                data[j] *= 1.8;
                data[j + 1] *= 1.8;
                data[j + 2] *= 1.8;
            }
            data[j + 0] = GammaLookUp[data[j + 0]];
            data[j + 1] = GammaLookUp[data[j + 1]];
            data[j + 2] = GammaLookUp[data[j + 2]];
        });
        
        let buf = Buffer.from(this.executor.data.buffer);
        // buf = encode(buf, {
        //     width: this.executor.width,
        //     height: this.executor.height,
        //     compressionLevel: 9,
        // });

        if (this.port) {
            this.port.write(buf);
            this.port.write(SEP);
        }
        // let timeMsEnd = (new Date()).getTime();
        // console.log("frame of size", buf.length, "bytes encoded in", timeMsEnd - timeMs, "milliseconds");
    }
}



