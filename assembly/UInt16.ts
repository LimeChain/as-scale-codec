import { Bytes, BIT_LENGTH } from "./utils/Bytes";
import { AbstractInt } from "./AbstractInt";

/** Representation for a UInt16 value in the system. */
export class UInt16 extends AbstractInt<u16>  {

    constructor(value: u16) {
        super(value, BIT_LENGTH.INT_16)
    }

    /** Instantiates new Uint16 from u8[] SCALE encoded bytes */
    static fromU8a(value: u8[]): UInt16 {
        var res = Bytes.toUint<u16>(value, BIT_LENGTH.INT_16);
        return new UInt16(res);
    }
}
