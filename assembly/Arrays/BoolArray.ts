import { Bool } from "./../Bool";
import { AbstractArray } from "./AbstractArray"

import { DecodedData } from "../interfaces/DecodedData";

export class BoolArray extends AbstractArray<Bool, bool> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<bool> {
        const scaleBool = Bool.fromU8a([value[0]]);

        return new DecodedData<bool>(
            scaleBool.value,
            scaleBool.encodedLength()
        )
    }

    /**
    * @description Instantiates ScaleBoolArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): BoolArray {
        return AbstractArray.fromU8a<BoolArray>(input);
    }
}
