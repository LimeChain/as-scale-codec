import { Bool } from "../Bool";
import { UInt8, UInt16, UInt32, UInt64 } from "../UInt";
import { Int8, Int16, Int32, Int64 } from '../Int';
import { Hash } from '../Hash';
import { BIT_LENGTH } from '../utils/Bytes';
import { ByteArray } from "../Arrays";
import { ScaleString } from "../ScaleString";

/**
 * ByteReader class that helps reading bytes into Scale-Codec types
 */
export class ByteReader{

    /**
     * u8 bytes
     */
    public bytes: u8[];
    /**
     * Current position to start decoding from
     */
    public curPos: i32 = 0;

    constructor(bytes: u8[], curPos: i32){
        this.bytes = bytes;
        assert(<i32>curPos < bytes.length, "Current position is invalid");
        this.curPos = curPos;
    }
    /**
     * Read Boolean value
     */
    readBool(): Bool {
        assert(this.bytes.length > 0, "ByteReader: Invalid bytes were provided");
        const val = Bool.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }

    readHash(): Hash {
        const val = Hash.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }
    
    /**
     * Int and UInt decoding methods
     */
    readInt8(): Int8 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_8, "ByteReader: Not enough Bytes to read for Int8");
        const val = Int8.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }
    readInt16(): Int16 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_16, "ByteReader: Not enough Bytes to read for Int16");
        const val = Int16.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }
    readInt32(): Int32 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_32, "ByteReader: Not enough Bytes to read for Int32");
        const val = Int32.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }
    readInt64(): Int64 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_64, "ByteReader: Not enough Bytes to read for Int64");
        const val = Int64.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }

    readUInt8(): UInt8 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_8 - <i32>this.curPos, "ByteReader: Not enough bytes to read for UInt8");
        const val = UInt8.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();        
        return val;
    }

    readUInt16(): UInt16 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_16 - <i32>this.curPos, "ByteReader: Not enough bytes to read for UInt16");
        const val = UInt16.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }

    readUInt32(): UInt32 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_32 - <i32>this.curPos, "ByteReader: Not enough bytes to read for UInt32");
        const val = UInt32.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }

    readUInt64(): UInt64 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_64 - <i32>this.curPos, "ByteReader: Not enough bytes to read for UInt8");
        const val = UInt64.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }

    /**
     * Reads byte array from buffer
     */
    readByteArray(): ByteArray {
        const val = ByteArray.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }

    /**
     * Reads scale string bytes
     */
    readScaleString(): ScaleString {
        const val = ScaleString.fromU8a(this.bytes, this.curPos);
        this.curPos += val.encodedLength();
        return val;
    }
}