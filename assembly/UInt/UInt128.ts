import { u128 } from "as-bignum";
import { Bytes } from "../utils/Bytes";

/** Representation for a UInt128 value in the system. */
export class UInt128 extends u128 {

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): UInt128 {
        const result = Bytes.decodeU128(value);
        return new UInt128(result[0], result[1]);
    }
}
