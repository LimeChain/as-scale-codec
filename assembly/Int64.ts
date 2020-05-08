import { Bytes, BIT_LENGTH } from "./utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a Int64 value in the system. */
export class Int64 extends AbstractInt<i64> {

    constructor(value: i64) {
        super(value, BIT_LENGTH.INT_64)
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a(): u8[] {
        let bytesEncoded = new Array<u8>(this.bitLength); //Bytes length / 8
        Bytes.putUint64(bytesEncoded, this.value);
        return bytesEncoded;
    }

    /**
     * @description Returns the string representation of the value
     */
    toString(): string {
        return this.value.toString();
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): Int64 {
        var res = Bytes.toUint64(value);
        return new Int64(res);
    }
}
