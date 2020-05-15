import { Codec } from "./Codec";
import { Bytes, BIT_LENGTH } from "./utils/Bytes"

export class ByteArray extends Array<u8> implements Codec {
    constructor(length: i32) {
        super(length);
    }

    /**
    * @description  Encodes ByteArray as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        return [];
    }


    /**
    * @description Instantiates ByteArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ByteArray {
        const bytesLength = Bytes.decodeInt(input);
        const bytesArray = new ByteArray(i32(bytesLength));

        Bytes.copyFromPosition(input, bytesArray, i32(input.length - bytesLength));

        return bytesArray;
    }
}
