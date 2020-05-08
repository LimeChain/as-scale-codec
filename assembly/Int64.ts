import { Codec } from "./Codec";
import { Bytes } from "./utils/Bytes";

/** Representation for a Int value in the system. */
export class Int64 implements Codec {

    constructor(public value: i64) {
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
    public encodedLength(): i64 {
        return 64 / 8;
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): Int64 {
        var res = Bytes.toUint64(value);
        return new Int64(res);
    }
}
