import SerialPort from 'serialport';
// import { encode } from 'node-libpng';
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
        let timeMs = (new Date()).getTime();
        const height = this.executor.data.length / (this.width * 3);
        
        let buf = Buffer.from(this.executor.data.buffer);
        // buf = encode(buf, {
        //     width: this.width,
        //     height: height,
        //     compressionLevel: 9,
        // });

        if (this.port) {
            this.port.write(buf);
            this.port.write(SEP);
        }
        let timeMsEnd = (new Date()).getTime();
        console.log("frame of size", buf.length, "bytes encoded in", timeMsEnd - timeMs, "milliseconds");
    }
}



