import { Bytes, BIT_LENGTH } from "./utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a Int32 value in the system. */
export class Int32 extends AbstractInt<i32> {

    constructor(value: i32) {
        super(value, BIT_LENGTH.INT_32)
    }

    /** Instantiates new Int32 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Int32 {
        var res = Bytes.toUint<u32>(value, BIT_LENGTH.INT_32);
        return new Int32(res);
    }
}
