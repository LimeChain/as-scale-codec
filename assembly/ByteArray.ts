import { Codec } from "./Codec";
import { Bytes, BIT_LENGTH } from "./utils/Bytes"

export class ByteArray extends Array<u8> implements Codec {
    constructor(length: i32) {
        super(length);
    }

    public toU8a (): u8[] {
        return [];
    }

    public encodedLength (): i32 {
        return this.length;
    }

    static fromU8a (input: u8[]): ByteArray {
        const bytesLength = Bytes.decodeInt(input);
        const bytesArray = new ByteArray(i32(bytesLength));

        Bytes.copyFromPosition(input, bytesArray, i32(input.length - bytesLength));

        return bytesArray;
    }
}
