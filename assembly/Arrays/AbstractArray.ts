import { Codec } from "../interfaces/Codec";

import { Bytes } from "../utils/Bytes";
import { BytesBuffer } from "../utils/BytesBuffer";

import { DecodedData } from "../interfaces/DecodedData";

export abstract class AbstractArray<ScaleType extends Codec, NativeType> extends Array<NativeType> {

    constructor (input: NativeType[]) {
        super(input.length);
        Bytes.copy<NativeType>(input, this);
    }

    /**
    * @description  Encodes values of all elements in u8[] successively as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const bytesBuffer = new BytesBuffer();
        bytesBuffer.encodeCompactInt(this.length);

        for (let i = 0; i < this.length; i++) {
            const element = instantiate<ScaleType>(this[i]);
            bytesBuffer.write(element.toU8a());
        }

        return bytesBuffer.bytes;
    }

    /**
    * @description Each child class has to provide decryption implementation for elements
    */
    public abstract decodeElement (value: u8[]): DecodedData<NativeType>;


    /**
    * @description  Instantiates type of ScaleArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a<TypeOfScaleArray> (input: u8[]): TypeOfScaleArray {
        const data = Bytes.decodeCompactInt(input);
        let bytes = input.slice(data.decBytes);

        const scaleArray = instantiate<TypeOfScaleArray>([]);

        for (let i: u64 = 0; i < data.value; i++) {
            const element = scaleArray.decodeElement(bytes);
            scaleArray.push(element.value);

            bytes = bytes.slice(element.decBytes);
        }

        return scaleArray;
    }
}
