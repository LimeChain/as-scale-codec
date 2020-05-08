import { Codec } from "./Codec";
import { Bytes } from "./utils/Bytes";

/** Representation for a Int value in the system. */
export class Int32 implements Codec {

    constructor(public value: i32) {
        this.value = value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a(): u8[] {
        // TODO
        return [];
    }

    /**
     * @description Returns the string representation of the value
     */
    toString(): string {
        return this.value.toString();
    }

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength(): i32 {
        return 32 / 8;
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): Int32 {
        var res = Bytes.toUint32(value);
        return new Int32(res);
    }
}
