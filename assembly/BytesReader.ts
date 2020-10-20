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
 * ByteReader class that helps reading bytes into Scale-Codec types
 */
export class BytesReader{
    /**
     * u8 bytes
     */
    public bytes: u8[];
    /**
     * Current index to start decoding from
     */
    public curIndex: i32 = 0;

    constructor(bytes: u8[]){
        assert(bytes.length > 0, "BytesReader: Empty bytes array is provided");
        this.bytes = bytes;
    }

    /**
     * Int and UInt decoding methods
     */
    readInt8(): Int8 {
        const value = Int8.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }
    readInt16(): Int16 {
        const value = Int16.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }
    readInt32(): Int32 {
        const value = Int32.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }
    readInt64(): Int64 {
        const value = Int64.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    readUInt8(): UInt8 {
        const value = UInt8.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();        
        return value;
    }

    readUInt16(): UInt16 {
        const value = UInt16.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    readUInt32(): UInt32 {
        const value = UInt32.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    readUInt64(): UInt64 {
        const value = UInt64.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    readCompactInt(): CompactInt{
        const value = CompactInt.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    /**
     * Other types
     */
    readBool(): Bool {
        const value = Bool.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    readHash(): Hash {
        const value = Hash.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }
    readByteArray(): ByteArray {
        const value = ByteArray.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }

    readScaleString(): ScaleString {
        const value = ScaleString.fromU8a(this.bytes, this.curIndex);
        this.curIndex += value.encodedLength();
        return value;
    }
}