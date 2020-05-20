import { Bool } from "./Bool";
import { Bytes } from "./utils/Bytes";
import {BytesReader} from "./utils/BytesReader";
import {BytesWriter} from "./utils/BytesWriter";


export class BoolArray extends Array<bool> {
    constructor(input: bool[]) {
        super(input.length);
        Bytes.copy<bool>(input, this);
    }

    /**
    * @description  Encodes BoolArray as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesWriter = new BytesWriter();
        bytesWriter.encodeInteger(this.length);

        for (let i = 0; i < this.length; i++) {
            bytesWriter.encodeBool(this[i]);
        }

        return bytesWriter.bytes;
    }

    /**
    * @description Instantiates BoolArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): BoolArray {
        const boolArrayLength = new BytesReader(input).decodeUint();
        const boolArrayStart = i32(input.length - boolArrayLength);

        if (boolArrayStart < 1) {
            throw new Error('Incorrectly encoded input');
        }

        const boolArray: BoolArray = new BoolArray([]);
        for (let i = 0; i < boolArrayLength; i++) {
            boolArray.push(Bool.fromU8a([input[boolArrayStart + i]]).value);
        }

        return boolArray;
    }
}

