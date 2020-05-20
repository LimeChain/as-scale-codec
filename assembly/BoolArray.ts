import { Bool } from "./Bool";
import { Bytes } from "./utils/Bytes";
import {BytesReader} from "./utils/BytesReader";


export class BoolArray extends Array<bool> {
    constructor(input: bool[]) {
        super(input.length);
        Bytes.copy<bool>(input, this);
    }

    /**
    * @description  Encodes BoolArray as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        let bytesBuffer = new Array<u8>(this.length);
        const encodedBytes: i32 = Bytes.encodeInteger(bytesBuffer, this.length);

        for (let i = 0; i < this.length; i++) {
            bytesBuffer[encodedBytes + i] = this[i] ? 0x01 : 0x00;
        }

        return bytesBuffer;
    }

    /**
    * @description Instantiates BoolArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): BoolArray {
        const boolArrayLength = new BytesReader(input).decodeUint();
        const boolArrayStart = i32(input.length - boolArrayLength);

        const boolArray: BoolArray = new BoolArray([]);
        for (let i = 0; i < boolArrayLength; i++) {
            boolArray.push(Bool.fromU8a([input[boolArrayStart + i]]).value);
        }

        return boolArray;
    }
}

