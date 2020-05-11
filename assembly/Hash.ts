import { Codec } from "./Codec";
import { Bytes } from './utils/Bytes';

export class Hash implements Codec {
    constructor(public data: StaticArray<u8>) {
        this.data = data;
    }

    toU8a (): u8[] {
        return [];
    }

    public toString (): string {

        // const stringBuffer = new Array<string>(this.encodedLength());
        // for (let i = 0; i < this.data.length; i++) {
        //     const byte = this.data[i];
        //     stringBuffer[i] = ('0' + (byte & 0xFF).toString()).slice(-2);

        // }

        // return "0x" + this.data.toString(16);
    }

    public encodedLength (): i32 {
        return 32;
    }

    static fromU8a (input: u8[]): Hash {
        let resultedArray: StaticArray<u8> = new StaticArray<u8>(32);
        Bytes.copy(input, resultedArray);

        return new Hash(resultedArray);
    }
}