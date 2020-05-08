import { Codec } from "./Codec";

/** Representation for a Int value in the system. */
export abstract class AbstractInt<T> implements Codec {

    readonly bitLength: i32;
    readonly value: T;

    constructor(value: T, bitLength: i32) {
        this.value = value;
        this.bitLength = bitLength;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    abstract toU8a(): u8[]

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength(): i32 {
        return this.bitLength;
    }
}
