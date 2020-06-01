import { Bytes, BIT_LENGTH } from "../utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a Int64 value in the system. */
export class Int64 extends AbstractInt<i64> {

    constructor (value: i64) {
        super(value, BIT_LENGTH.INT_64)
    }

    /** Instantiates new Int64 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Int64 {
        var res = Bytes.toUint<u64>(value, BIT_LENGTH.INT_64);
        return new Int64(res);
    }
}
