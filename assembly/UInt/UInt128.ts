import { u128 } from "as-bignum";
import {BIT_LENGTH, Bytes} from "../utils/Bytes";

/** Representation for a UInt128 value in the system. */
export class UInt128 extends u128 {

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): UInt128 {
        if (value.length == 0) {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error('Invalid input: Byte array should not be empty');
        }

        const mode = value[0] & 0x03;
        if (i32(mode) <= BIT_LENGTH.INT_16) {
            return new UInt128(u64(Bytes.decodeSmallInt(value, mode).value), 0);
        }

        const valueLE = value.slice(1);
        const buffer = valueLE.dataStart;
        const lo = load<u64>(buffer, 0);
        const hi = valueLE.length <= 8 ? 0 : load<u64>(buffer, 1 * sizeof<u64>());
        return new UInt128(lo, hi);
    }
}
