import { Bytes } from "./utils/Bytes"

export class ByteArray extends Array<u8> {
    constructor(input: u8[]) {
        super(input.length);
        Bytes.copy(input, this);
    }

    /**
    * @description  Encodes ByteArray as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        let bytesBuffer = new Array<u8>(this.length);
        const encodedBytes: i32 = Bytes.encodeInteger(bytesBuffer, this.length);

        Bytes.copy(this, bytesBuffer, i32(encodedBytes));

        return bytesBuffer;
    }

    /**
    * @description  Return hex representation of ByteArray
    */
    public toString (): string {
        let result = "0x";
        for (let i = 0; i < this.length; i++) {
            const str = this[i].toString();
            if (str.length == 1) {
                result += "0";
            }

            result += str;
        }

        return result;
    }

    /**
    * @description Instantiates ByteArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ByteArray {
        const bytesLength = Bytes.decodeInt(input);
        const bytes = input.slice(i32(input.length - bytesLength));

        return new ByteArray(bytes);
    }
}

