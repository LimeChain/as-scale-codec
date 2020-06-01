import { Bytes } from "../utils/Bytes";
import { Codec } from "../interfaces/Codec";
import { BIT_LENGTH } from "../utils/Bytes";
import { BytesBuffer } from "../utils/BytesBuffer";

/** Representation for a Int8 value in the system. */
export class CompactInt implements Codec {

    public readonly value: i64;
    protected bitLength: i32 = BIT_LENGTH.INT_8;

    constructor (value: i64) {
        this.value = value;
    }

    /**
    * @description  Encodes the value as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesBuffer = new BytesBuffer();
        bytesBuffer.encodeLength(this.value);

        return bytesBuffer.bytes;
    }

    /**
    * @description Returns the string representation of the value
    */
    toString (): string {
        return this.value.toString();
    }

    /**
     * @description The length of Int when the value is encoded
     */
    public encodedLength (): i32 {
        return this.bitLength;
    }

    /**
     * @description CompactInt could be 1, 2, 4, 8 bytes. Set bytes dynamically
     */
    public setEncodedLength (encodedLength: i32): void {
        this.bitLength = encodedLength;
    }

    /**
     * @description Instantiates Compact Int from u8[] SCALE encoded bytes
     * Compact Int decodes int8, int16, int32, int64 size correctly  
     */
    static fromU8a (value: u8[]): CompactInt {
        const decodedData = Bytes.decodeLength(value);
        const compactInt = new CompactInt(decodedData.length);

        compactInt.setEncodedLength(decodedData.bytes);
        return compactInt;
    }
}
