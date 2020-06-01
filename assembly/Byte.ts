import { Codec } from "./interfaces/Codec";
import { BIT_LENGTH } from "./utils/Bytes";

export class Byte implements Codec {

    public readonly value: u8;
    protected bitLength: i32;

    constructor (value: u8) {
        this.value = value;
        this.bitLength = BIT_LENGTH.INT_8;
    }

    public toU8a (): u8[] {
        return [this.value];
    }

    /**
    * @description The length of Byte when the value is encoded
    */
    public encodedLength (): i32 {
        return this.bitLength;
    }

    /** Instantiates new Byte from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Byte {
        return new Byte(value[0]);
    }
}