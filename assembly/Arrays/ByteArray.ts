import { Byte } from "../Byte";
import { AbstractArray } from "./AbstractArray";

import { DecodedData } from "../interfaces/DecodedData";

export class ByteArray extends AbstractArray<Byte, u8> {

    /**
    * @description  Return hex representation of ByteArray
    */
    public toHexString (): string {
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

    public decodeElement (value: u8[]): DecodedData<u8> {
        const scaleByte = Byte.fromU8a([value[0]]);

        return new DecodedData<u8>(
            scaleByte.value,
            scaleByte.encodedLength()
        )
    }

    static fromU8a (input: u8[]): ByteArray {
        return AbstractArray.fromU8a<ByteArray>(input);
    }
}

