import { Bytes } from "../utils/Bytes";
import { Codec } from "../interfaces/Codec";
import { BIT_LENGTH } from "../utils/Bytes";
import { BytesBuffer } from "../utils/BytesBuffer";

/** Representation for a Int8 value in the system. */
export class CompactInt implements Codec {

    public readonly value: i64;
    protected bitLength: i32;

    constructor (value: i64) {
        this.value = value;

        if (value < 1 << 6) this.bitLength = BIT_LENGTH.INT_8;
        else if (value < 1 << 14) this.bitLength = BIT_LENGTH.INT_16;
        else if (value < 1 << 30) this.bitLength = BIT_LENGTH.INT_32;
        else {
            this.bitLength = BIT_LENGTH.INT_64;
        }
    }

    /**
    * @description  Encodes the value as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesBuffer = new BytesBuffer();
        bytesBuffer.encodeCompactInt(this.value);

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
     * @description Instantiates Compact Int from u8[] SCALE encoded bytes
     * Compact Int decodes int8, int16, int32, int64 size correctly  
     */
    static fromU8a (value: u8[]): CompactInt {
        const decodedData = Bytes.decodeCompactInt(value);
        return new CompactInt(decodedData.value);
    }
}
