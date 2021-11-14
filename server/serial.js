import SerialPort from 'serialport';
// import { encode } from 'node-libpng';
import { Buffer } from 'buffer';

const SEP = "SEPERATING TEXT";

export class SerialView {
    constructor(executor) {
        this.executor = executor;

        const port = new SerialPort("/dev/serial/by-id/usb-Teensyduino_USB_Serial_8157270-if00", {
          baudRate: 115200
        });
        port.open(() => {
            this.port = port;
        });
    }
    render() {
        // let timeMs = (new Date()).getTime();
        
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



