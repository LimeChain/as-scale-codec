import { Bytes } from "./utils/Bytes"
import {BytesReader} from "./utils/BytesReader";
import {BytesWriter} from "./utils/BytesWriter";

export class ByteArray extends Array<u8> {
    constructor(input: u8[]) {
        super(input.length);
        Bytes.copy<u8>(input, this);
    }

    /**
    * @description  Encodes ByteArray as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesWriter = new BytesWriter();
        bytesWriter.encodeInteger(this.length);
        return bytesWriter.bytes.concat(this);
    }

    /**
    * @description  Return hex representation of ByteArray
    */
    public toHexString (): string {
        let result = "0x";
        for (let i = 0; i < this.length; i++) {
            const str = this[i].toString();
            if (str.length == 1) {
                result += "0";
            }

            result += str;
        }

        return result;
    }

    /**
    * @description Instantiates ByteArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ByteArray {
        const bytesLength = new BytesReader(input).decodeUint();
        const bytes = input.slice(i32(input.length - bytesLength));

        return new ByteArray(bytes);
    }
}

