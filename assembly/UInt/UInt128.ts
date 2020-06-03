import { u128 } from "as-bignum";
import { Bytes } from "../utils/Bytes";
import { Codec } from "../interfaces/Codec";

/** Representation for a UInt128 value in the system. */
export class UInt128 implements Codec {

    readonly value: u128;

    constructor (lo: u64, hi: u64) {
        this.value = new u128(lo, hi);
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a (): u8[] {
        if (this.value < u128.fromI32(1) << 6) {
            trace("it is lower than 63")
        }
        return []
    }

    toString(): string {
        return this.value.toString();
    }

    /**
     * Instantiates new UInt128 from String representation of Number
     * @param value
     */
    static fromString(value: string): UInt128 {
        const u128Instance = u128.fromString(value);
        // return new UInt128(u128Instance.lo, u128Instance.hi);
    }

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): UInt128 {
        const result = Bytes.decodeU128(value);
        return new UInt128(result[0], result[1]);
    }
}
