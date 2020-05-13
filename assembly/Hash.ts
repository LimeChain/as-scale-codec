import { Codec } from "./Codec";
import { Bytes } from './utils/Bytes';

export class Hash extends Array<u8> implements Codec {

    constructor() {
        super(32);
    }

    // Encodes
    public toU8a (): u8[] {
        const result: u8[] = new Array<u8>(this.encodedLength());
        Bytes.copyToPosition(this, result);

        return result;
    }

    public toString (): string {
        return "0x" + this.join('');
    }

    static bytesToHash (bytes: u8[]): Hash {
        let hash = new Hash();
        if (bytes.length > 32) {
            bytes = bytes.slice(bytes.length - 32);
        }

        const position: i32 = 32 - bytes.length;
        Bytes.copyToPosition(bytes, hash, position);
        return hash;
    }

    public encodedLength (): i32 {
        return 32;
    }

    // Decodes
    static fromU8a (input: u8[]): Hash {
        const hash: Hash = new Hash();
        Bytes.copyToPosition(input, hash);
        return hash;
    }
}
