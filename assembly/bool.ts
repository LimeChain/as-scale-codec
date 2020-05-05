import { Encoder } from "./encoder";
import { Decoder } from "./decoder";

/** Representation for a boolean value in the system. */
export class Bool {

    constructor(public value: bool) {
        this.value = value;
    }

    /** Encodes the value as Uint8Array as per the SCALE codec specification */
    encode(): u8[] {
        return Encoder.encodeBool(this.value);
    }

    /** Instantiates new Bool from Uint8Array SCALE encoded bytes */
    static fromU8a (value: u8[]): Bool {
        let result = Decoder.decodeBool(value);
        return new Bool(result);
    }
}