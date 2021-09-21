import encode from '@wasm-codecs/oxipng';
import { PNG } from 'pngjs';
import SerialPort from 'serialport';
import { encode as encodeLibpng } from "node-libpng";
import { Buffer } from 'buffer';

const SEP = "SEPERATING TEXT";

export class SerialView {
    constructor(executor, width) {
        this.executor = executor;
        // this.port = thing;
        this.width = width;

        const port = new SerialPort("/dev/serial/by-id/usb-Teensyduino_USB_Serial_8157270-if00", {
          baudRate: 115200
        });
        port.open(() => {
            this.port = port;
        });
    }
    render() {
        // console.log("Compressing");
        // let timeMs = (new Date()).getTime();
        const height = this.executor.data.length / (this.width * 3);
        
        const buf = Buffer.from(this.executor.data.buffer);
        const basic = encodeLibpng(buf, {
            width: this.width,
            height: height,
            compressionLevel: 9,
        });

        if (this.port) {
            this.port.write(basic);
            this.port.write(SEP);
        }
        // let timeMsEnd = (new Date()).getTime();
        // console.log("    done in", timeMsEnd - timeMs);
    }
}



