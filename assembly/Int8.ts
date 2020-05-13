import { AbstractInt } from "./AbstractInt";
import { BIT_LENGTH } from "./utils/Bytes";

/** Representation for a Int8 value in the system. */
export class Int8 extends AbstractInt<i8> {

<<<<<<< HEAD
    constructor(public value: i8) {
        this.value = value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a (): u8[] {
        if (this.value < 1 << 6) {

        }
        return [];
    }

    /**
     * @description Returns the string representation of the value
     */
    toString (): string {
        return this.value.toString();
    }

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength (): i32 {
        return 1;
=======
    constructor(value: i8) {
        super(value, BIT_LENGTH.INT_8)
>>>>>>> 6b60df31fe8d87ded6a01890a5575a8333c8646f
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Int8 {
        if (value.length != 1) {
            throw new Error('cannot decode invalid i8 encoded value');
        }
        return new Int8(value[0]);
    }
}
