import { BIT_LENGTH } from "../utils/Bytes";
import { AbstractInt } from "../AbstractInt";

/** Representation for a UInt8 value in the system. */
export class UInt8 extends AbstractInt<u8> {

    constructor (value: u8) {
        super(value, BIT_LENGTH.INT_8)
    }

    /** Instantiates new UInt8 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): UInt8 {
        if (value.length != 1) {
            throw new Error('cannot decode invalid i8 encoded value');
        }
        return new UInt8(value[0]);
    }
}
