import { Bytes } from "./utils/Bytes";
import { ScaleString } from "./ScaleString";

export class ScaleStringArray extends Array<string>{
    constructor(input: Array<string>) {
        super(input.length);
        Bytes.copy<string>(input, this);
    }

    /**
    * @description  Encodes ScaleStringArray as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesBuffer = new Array<u8>();
        let arrStart = Bytes.encodeInteger(bytesBuffer, this.length);

        for (let i = 0; i < this.length; i++) {
            const byteArray = new ScaleString(this[i]);
            const encodedByteArray = byteArray.toU8a();
            Bytes.copy(encodedByteArray, bytesBuffer, arrStart);

            arrStart += encodedByteArray.length;
        }

        return bytesBuffer;
    }

    /**
    * @description Instantiates ScaleArrayString from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ScaleStringArray {
        const data = Bytes.decodeData(input);
        let bytes = input.slice(data.encBytes);

        const scaleStringArray = new ScaleStringArray([]);

        for (let i: u64 = 0; i < data.length; i++) {
            const stringData = Bytes.decodeData(bytes);
            const encodedStringLength = i32(stringData.encBytes + stringData.length);

            const scaleString = ScaleString.fromU8a(bytes.slice(0, encodedStringLength));
            scaleStringArray.push(scaleString.toString());

            bytes = bytes.slice(encodedStringLength);
        }

        return scaleStringArray;
    }
}