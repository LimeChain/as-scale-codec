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

import { Codec } from "./interfaces/Codec";
import { BIT_LENGTH } from "./utils/Bytes";

export class Byte implements Codec {

    private _value: u8;
    protected bitLength: i32;

    get value(): u8{
        return this._value;
    }

    constructor (value: u8 = 0) {
        this._value = value;
        this.bitLength = BIT_LENGTH.INT_8;
    }

    /**
    * @description Encodes Byte as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        return [this.value];
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    public populateFromBytes(bytes: u8[], index: i32 = 0): void{
        assert(bytes.length - index > 0, 'Bool: Cannot decode invalid input');
        this._value = bytes[index];
    }

    /**
    * @description The length of Byte when the value is encoded
    */
    public encodedLength (): i32 {
        return this.bitLength;
    }

    /** Instantiates new Byte from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[], index: i32 = 0): Byte {
        assert(value.length - index > 0, 'Byte: cannot decode invalid type');
        return new Byte(value[index]);
    }

    @inline @operator('==')
    static eq(a: Byte, b: Byte): bool {
        return a.value == b.value;
    }

    @inline @operator('!=')
    static notEq(a: Byte, b: Byte): bool {
        return a.value != b.value;
    }
}