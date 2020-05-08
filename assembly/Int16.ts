import { Bytes, BIT_LENGTH } from "./utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a Int16 value in the system. */
export class Int16 extends AbstractInt<i16>  {

    constructor(value: i16) {
        super(value, BIT_LENGTH.INT_16)
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a(): u8[] {
        let bytesEncoded = new Array<u8>(this.bitLength);
        Bytes.putUint16(bytesEncoded, this.value);
        return bytesEncoded;
    }
    
    /**
     * @description Returns the string representation of the value
     */
    toString(): string {
        return this.value.toString();
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): Int16 {
        var res = Bytes.toUint16(value);
        return new Int16(res);
    }
}
