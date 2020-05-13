import { Bytes, BIT_LENGTH } from "./utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a Int16 value in the system. */
export class Int16 extends AbstractInt<i16>  {

    constructor(value: i16) {
        super(value, BIT_LENGTH.INT_16)
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Int16 {
        var res = Bytes.toUint<u16>(value, BIT_LENGTH.INT_16);
        return new Int16(res);
    }
}
