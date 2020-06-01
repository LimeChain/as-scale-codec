import { Bytes } from "../utils/Bytes";
import { AbstractArray } from "./AbstractArray";
import { ScaleString } from "../ScaleString";

import { DecodedData } from "../interfaces/DecodedData";

export class StringArray extends AbstractArray<ScaleString, string>{

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<string> {
        const stringLength = Bytes.decodeLength(value);
        const encodedStringLength = i32(stringLength.bytes + stringLength.length);

        return new DecodedData<string>(
            ScaleString.fromU8a(value.slice(0, encodedStringLength)).value,
            encodedStringLength
        )
    }

    /**
    * @description Instantiates ScaleStringArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): StringArray {
        return AbstractArray.fromU8a<StringArray>(input);
    }
}