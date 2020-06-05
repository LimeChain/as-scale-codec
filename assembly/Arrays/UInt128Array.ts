import { AbstractArray } from "./AbstractArray";
import { DecodedData } from "../interfaces/DecodedData";
import { UInt128 } from "../UInt/UInt128";
import { u128 } from "as-bignum";

export class UInt128Array extends AbstractArray<UInt128, u128> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<u128> {
        const u128Instance = UInt128.fromU8a(value);

        return new DecodedData<u128>(
            u128Instance.value,
            u128Instance.encodedLength()
        )
    }

    /**
    * @description Instantiates ScaleIntArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): UInt128Array {
        return AbstractArray.fromU8a<UInt128Array>(input);
    }
}

