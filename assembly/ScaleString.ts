import { Bytes } from "./utils/Bytes"
import { ByteArray } from "./ByteArray";
import { BytesReader } from "./utils/BytesReader";

export class ScaleString extends ByteArray {

    private readonly value: string;

    constructor(input: string) {
        super([]);
        this.value = input;

        const inputBuffer: ArrayBuffer = String.UTF8.encode(input);
        const u8Input = Uint8Array.wrap(inputBuffer);

        for (let i = 0; i < u8Input.length; i++) {
            this[i] = u8Input[i];
        }
    }

    /**
     * @description Returns the string representation
     */
    toString (): string {
        return this.value;
    }

    /**
    * @description Instantiates String from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ScaleString {
        const bytesReader = new BytesReader(input);
        bytesReader.decodeUint();
        const stringStart = i32(input.length - bytesReader.readBytes);

        if (stringStart < 1) {
            throw new Error('Incorrectly encoded input');
        }

        const bytes = input.slice(stringStart);
        const buff = new Uint8Array(bytesReader.readBytes);
        Bytes.copyToTyped(bytes, buff);

        return new ScaleString(String.UTF8.decode(buff.buffer));
    }
}

