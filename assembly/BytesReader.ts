// Copyright 2020 LimeChain Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Bool } from "./Bool";
import { UInt8, UInt16, UInt32, UInt64 } from "./UInt";
import { Int8, Int16, Int32, Int64, CompactInt } from './Int';
import { Hash } from './Hash';
import { ByteArray } from "./Arrays";
import { ScaleString } from "./ScaleString";

/**
 * @description BytesReader class that helps reading bytes into SCALE Codec types
 */
export class BytesReader{
    /**
     * u8 bytes
     */
    public readonly bytes: u8[];
    /**
     * Current index to start decoding from
     */
    public index: i32 = 0;

    constructor(bytes: u8[]){
        this.bytes = bytes;
    }

    /**
     * Read a single byte
     */
    readByte(): u8{
        const byte = this.bytes[this.index];
        this.index += 1;
        return byte;
    }
    /**
     * Read custom sized array if raw bytes
     * @param size byte array size
     */
    readBytes(size: i32): u8[]{
        const bytes: u8[] = this.bytes.slice(this.index, this.index + size);
        this.index += size;
        return bytes;
    }

    /**
     * Read bytes into Int8
     */
    readInt8(): Int8 {
        const value = Int8.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into Int16
     */
    readInt16(): Int16 {
        const value = Int16.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into Int32
     */
    readInt32(): Int32 {
        const value = Int32.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into Int64
     */
    readInt64(): Int64 {
        const value = Int64.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into UInt8
     */
    readUInt8(): UInt8 {
        const value = UInt8.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();        
        return value;
    }
    /**
     * Read bytes into UInt16
     */
    readUInt16(): UInt16 {
        const value = UInt16.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into UInt32
     */
    readUInt32(): UInt32 {
        const value = UInt32.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into UInt64
     */
    readUInt64(): UInt64 {
        const value = UInt64.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into CompactInt
     */
    readCompactInt(): CompactInt{
        const value = CompactInt.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }

    /**
     * Read byte into Bool
     */
    readBool(): Bool {
        const value = Bool.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into Hash
     */
    readHash(): Hash {
        const value = Hash.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into ByteArray
     */
    readByteArray(): ByteArray {
        const value = ByteArray.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Read bytes into ScaleString
     */
    readScaleString(): ScaleString {
        const value = ScaleString.fromU8a(this.bytes, this.index);
        this.index += value.encodedLength();
        return value;
    }
    /**
     * Returns the unread bytes from the reader
     */
    getLeftoverBytes(): u8[]{
        return this.bytes.slice(this.index);
    }
}