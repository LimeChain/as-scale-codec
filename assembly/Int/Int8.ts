import { AbstractInt } from "./AbstractInt";
import { BIT_LENGTH } from "../utils/Bytes";

/** Representation for a Int8 value in the system. */
export class Int8 extends AbstractInt<i8> {

    constructor (value: i8) {
        super(value, BIT_LENGTH.INT_8)
    }

    /** Instantiates new Int8 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Int8 {
        if (value.length != 1) {
            throw new Error('cannot decode invalid i8 encoded value');
        }
        return new Int8(value[0]);
    }
}
