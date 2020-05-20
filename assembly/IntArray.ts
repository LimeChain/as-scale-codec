import { Bytes} from "./utils/Bytes";
import {BytesReader} from "./utils/BytesReader";
import {BytesWriter} from "./utils/BytesWriter";


export class IntArray extends Array<i64> {
    constructor(input: i64[]) {
        super(input.length);
        Bytes.copy<i64>(input, this);
    }

    /**
     * @description  Encodes IntArray as u8[] as per the SCALE codec specification
     */
    public toU8a (): u8[] {
        const bytesWriter = new BytesWriter();
        bytesWriter.encodeInteger(this.length);

        for (let i = 0; i < this.length; i++) {
            bytesWriter.encodeInteger(this[i]);
        }

        return bytesWriter.bytes;
    }

    /**
     * @description Instantiates IntArray from u8[] SCALE encoded bytes (Decode)
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

