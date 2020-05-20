import { Bytes } from "./utils/Bytes";
import {Int64} from "./Int64";
import {BytesReader} from "./utils/BytesReader";


export class IntArray extends Array<i64> {
    constructor(input: i64[]) {
        super(input.length);
        Bytes.copy<i64>(input, this);
    }

    /**
     * @description  Encodes BoolArray as u8[] as per the SCALE codec specification
     */
    public toU8a (): u8[] {
        // TODO
        return [];
    }

    /**
     * @description Instantiates BoolArray from u8[] SCALE encoded bytes (Decode)
     */
    static fromU8a (input: u8[]): IntArray {
        const bytesReader = new BytesReader(input);
        const intArrayLength = bytesReader.decodeUint();

        const intArray: IntArray = new IntArray([]);
        for (let i = 0; i < intArrayLength; i++) {
            intArray.push(bytesReader.decodeUint());
        }

        return intArray;
    }
}

