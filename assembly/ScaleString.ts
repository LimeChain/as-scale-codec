import { Bytes } from "./utils/Bytes"
import { ByteArray } from "./ByteArray";

export class ScaleString extends Array<u8> {
    constructor(input: string) {
        const inputBuffer: ArrayBuffer = String.UTF8.encode(input);
        const u8Input = Uint8Array.wrap(inputBuffer)

        super(u8Input.length);
        for (let i = 0; i < u8Input.length; i++) {
            this[i] = u8Input[i];
        }
    }

    // /**
    // * @description  Encodes string as u8[] as per the SCALE codec specification
    // */
    public toU8a (): u8[] {
        let bytesBuffer = new Array<u8>(this.length);
        const encodedBytes: i32 = Bytes.encodeInteger(bytesBuffer, this.length);

        Bytes.copy(this, bytesBuffer, i32(encodedBytes));

        return bytesBuffer;
    }

    /**
    * @description Instantiates String from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ScaleString {
        const bytesLength = i32(Bytes.decodeInt(input));
        const bytesStart = input.length - bytesLength;

        const buff = new Uint8Array(bytesLength);
        for (let i = 0; i < bytesLength; i++) {
            const byte: u8 = input[bytesStart + i];
            buff[i] = byte;
        }

        return new ScaleString(String.UTF8.decode(buff.buffer));
    }
}

