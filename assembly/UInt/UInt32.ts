import { Bytes, BIT_LENGTH } from "../utils/Bytes";
import { AbstractInt } from "../AbstractInt";

/** Representation for a UInt32 value in the system. */
export class UInt32 extends AbstractInt<i32> {

    constructor (value: u32) {
        super(value, BIT_LENGTH.INT_32)
    }

    /** Instantiates new UInt32 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): UInt32 {
        var res = Bytes.toUint<u32>(value, BIT_LENGTH.INT_32);
        return new UInt32(res);
    }
}
