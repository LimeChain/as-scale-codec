import { u128 } from "as-bignum";
import { BIT_LENGTH, Bytes } from "./utils/Bytes";
import {BytesReader} from "./utils/BytesReader";

/** Representation for a UInt128 value in the system. */
export class UInt128 extends u128 {

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): UInt128 {
        const bytesReader = new BytesReader(value);
        const result = bytesReader.decodeBigInt();
        return new UInt128(result[0], result[1]);
    }
}
