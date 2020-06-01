import { Bytes, BIT_LENGTH } from "../utils/Bytes";
import { AbstractInt } from "../Int/AbstractInt";

/** Representation for a UInt64 value in the system. */
export class UInt64 extends AbstractInt<u64> {

    constructor (value: u64) {
        super(value, BIT_LENGTH.INT_64)
    }

    /** Instantiates new UInt64 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): UInt64 {
        var res = Bytes.toUint<u64>(value, BIT_LENGTH.INT_64);
        return new UInt64(res);
    }
}
