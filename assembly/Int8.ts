import { AbstractInt } from "./AbstractInt";
import { BIT_LENGTH } from "./utils/Bytes";

/** Representation for a Int8 value in the system. */
export class Int8 extends AbstractInt<i8> {

    constructor(value: i8) {
        super(value, BIT_LENGTH.INT_8)
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(1); //Bytes length / 8
        bytesEncoded[0] = this.value;
        return bytesEncoded;
    }


    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Int8 {
        if (value.length != 1) {
            throw new Error('cannot decode invalid i8 encoded value');
        }
        return new Int8(value[0]);
    }
}
