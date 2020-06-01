import { Codec } from "./interfaces/Codec";

/** Representation for a boolean value in the system. */
export class Bool implements Codec {

    public readonly value: bool

    constructor (value: bool) {
        this.value = value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification
     * true -> [1]
     * false -> [0]
     */
    toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(1);
        bytesEncoded[0] = this.value ? 0x01 : 0x00;
        return bytesEncoded;
    }

    /**
     * @description Returns the string representation of the value
     */
    toString (): string {
        return `${this.value}`;
    }

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength (): i32 {
        return 1;
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Bool {
        if (value.length != 1) {
            throw new Error('cannot decode invalid boolean'); // TODO use null
        }
        if (value[0] == 1 || value[0] == 0) {
            return new Bool(value[0] == 1);
        }
        throw new Error('cannot decode invalid boolean'); // TODO use null
    }
}
