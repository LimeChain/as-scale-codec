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
    public static BOOL_LENGTH: u8 = 1;
    public static HASH_LENGTH: u8 = 32;

    /**
     * u8 bytes
     */
    public bytes: u8[];
    /**
     * Current position to start decoding from
     */
    public curPos: i32;

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
        const val = Bool.fromU8a(this.bytes.slice(this.curPos, this.curPos + ByteReader.BOOL_LENGTH));
        this.curPos += ByteReader.BOOL_LENGTH;
        return val;
    }

    readHash(): Hash {
        assert(<i32>this.bytes.length >= <i32>ByteReader.HASH_LENGTH, "ByteReader: Not enough bytes to read. Hash length: " + ByteReader.HASH_LENGTH.toString());
        const val = Hash.fromU8a(this.bytes.slice(this.curPos, this.curPos + ByteReader.HASH_LENGTH));
        this.curPos += ByteReader.HASH_LENGTH;
        return val;
    }
    
    /**
     * Int and UInt decoding methods
     */
    readInt8(): Int8 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_8, "ByteReader: Not enough ");
        const val = Int8.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_8));
        this.curPos += BIT_LENGTH.INT_8;
        return val;
    }
    readInt16(): Int16 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_16);
        const val = Int16.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_16));
        this.curPos += BIT_LENGTH.INT_16;
        return val;
    }
    readInt32(): Int32 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_32);
        const val = Int32.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_32));
        this.curPos += BIT_LENGTH.INT_32;
        return val;
    }
    readInt64(): Int64 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_64);
        const val = Int64.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_64));
        this.curPos += BIT_LENGTH.INT_64;
        return val;
    }

    readUInt8(): UInt8 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_8 - <i32>this.curPos, "Not enough bytes to read");
        const val = UInt8.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_8));
        this.curPos += BIT_LENGTH.INT_8;
        return val;
    }

    readUInt16(): UInt16 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_16 - <i32>this.curPos, "Not enough bytes to read");
        const val = UInt16.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_16));
        this.curPos += BIT_LENGTH.INT_16;
        return val;
    }

    readUInt32(): UInt32 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_32 - <i32>this.curPos, "Not enough bytes to read");
        const val = UInt32.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_32));
        this.curPos += BIT_LENGTH.INT_32;
        return val;
    }

    readUInt64(): UInt64 {
        assert(<i32>this.bytes.length >= BIT_LENGTH.INT_64 - <i32>this.curPos, "Not enough bytes to read");
        const val = UInt64.fromU8a(this.bytes.slice(this.curPos, this.curPos + BIT_LENGTH.INT_64));
        this.curPos += BIT_LENGTH.INT_64;
        return val;
    }

    /**
     * Reads byte array from buffer
     */
    readByteArray(): ByteArray {
        const val = ByteArray.fromU8a(this.bytes.slice(this.curPos));
        this.curPos += val.encodedLength();
        return val;
    }

    readScaleString(): ScaleString {
        const val = ScaleString.fromU8a(this.bytes.slice(this.curPos));
        this.curPos += val.encodedLength();
        return val;
    }
}