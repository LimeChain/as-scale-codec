import { Codec } from "./Codec";
import { Bytes, BIT_LENGTH } from "./utils/Bytes";

/** Representation for a Int value in the system. */
export abstract class AbstractInt<T extends number> implements Codec {

    protected bitLength: i32;
    readonly value: T;

    constructor(value: T, bitLength: i32) {
        this.value = value;
        this.bitLength = bitLength;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    public toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(this.bitLength);
        Bytes.putUint<T>(bytesEncoded, this.value, this.bitLength);
        return bytesEncoded;
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
        return this.bitLength;
    }
}
