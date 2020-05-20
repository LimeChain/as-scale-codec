import { Bytes } from "./utils/Bytes";
import {Int64} from "./Int64";


export class IntArray extends Array<i64> {
    constructor(input: i64[]) {
        super(input.length);
        Bytes.copy<i64>(input, this);
    }

    /**
     * @description  Encodes BoolArray as u8[] as per the SCALE codec specification
     */
    public toU8a (): u8[] {
        let bytesBuffer = new Array<u8>(this.length);
        const encodedBytes: i32 = Bytes.encodeInteger(bytesBuffer, this.length);

        for (let i = 0; i < this.length; i++) {
            bytesBuffer[encodedBytes + i] = this[i] ? 0x01 : 0x00;
        }

        return bytesBuffer;
    }

    /**
     * @description Instantiates BoolArray from u8[] SCALE encoded bytes (Decode)
     */
    static fromU8a (input: u8[]): IntArray {
        const intArrayLength = Bytes.decodeInt(input);
        const intArrayStart = i32(input.length - intArrayLength);
        trace(intArrayLength.toString());
        const intArray: IntArray = new IntArray([]);
        for (let i = 0; i < intArrayLength; i++) {
            intArray.push(Bytes.decodeInt([0x04]));
        }
        // intArray.push(Bytes.decodeInt([0x04, 0x08, 0x0c, 0x10]));
        // intArray.push(Bytes.decodeInt([0x08, 0x0c, 0x10]));
        // intArray.push(Bytes.decodeInt([0x0c, 0x10]));
        // intArray.push(Bytes.decodeInt([0x10]));

        // [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10]

        // intArray.push(Bytes.decodeInt([0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10]));
        // intArray.push(Bytes.decodeInt([0x08, 0x0c, 0x10]));
        // intArray.push(Bytes.decodeInt([0x0c, 0x10]));
        // intArray.push(Bytes.decodeInt([0x10]));


        return intArray;
    }
}

