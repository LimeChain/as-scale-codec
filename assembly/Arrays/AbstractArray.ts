import { Codec } from "../interfaces/Codec";

import { Bytes } from "../utils/Bytes";
import { BytesBuffer } from "../utils/BytesBuffer";

import { DecodedData } from "../interfaces/DecodedData";

export abstract class AbstractArray<ScaleType extends Codec, BaseType> extends Array<BaseType> {

    constructor (input: BaseType[]) {
        super(input.length);
        Bytes.copy<BaseType>(input, this);
    }

    public toU8a (): u8[] {
        const bytesBuffer = new BytesBuffer();
        bytesBuffer.encodeLength(this.length);

        for (let i = 0; i < this.length; i++) {
            const element = instantiate<ScaleType>(this[i]);
            bytesBuffer.write(element.toU8a());
        }

        return bytesBuffer.bytes;
    }

    public abstract decodeElement (value: u8[]): DecodedData<BaseType>;

    static fromU8a<TypeOfScaleArray> (input: u8[]): TypeOfScaleArray {
        const data = Bytes.decodeLength(input);
        let bytes = input.slice(data.bytes);

        const scaleArray = instantiate<TypeOfScaleArray>([]);

        for (let i: u64 = 0; i < data.length; i++) {
            const element = scaleArray.decodeElement(bytes);
            scaleArray.push(element.value);

            bytes = bytes.slice(element.decBytes);
        }

        return scaleArray;
    }
}
