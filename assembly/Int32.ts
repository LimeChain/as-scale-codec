import { Bytes, BIT_LENGTH } from "./utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a Int32 value in the system. */
export class Int32 extends AbstractInt<i32> {

    constructor(value: i32) {
        super(value, BIT_LENGTH.INT_32)
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a(): u8[] {
        let bytesEncoded = new Array<u8>(this.bitLength);
        Bytes.putUint32(bytesEncoded, this.value);
        return bytesEncoded;
    }

    /**
     * @description Returns the string representation of the value
     */
    toString(): string {
        return this.value.toString();
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): Int32 {
        var res = Bytes.toUint32(value);
        return new Int32(res);
    }
}
