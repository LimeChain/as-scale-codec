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
import { UnwrappableCodec } from "./interfaces/UnwrappableCodec";
import { BIT_LENGTH } from "./utils/Bytes";

export class Byte implements Codec, UnwrappableCodec<u8>{

    public readonly value: u8;
    protected bitLength: i32;

    constructor (value: u8) {
        this.value = value;
        this.bitLength = BIT_LENGTH.INT_8;
    }

    /**
     * @description Returns the inner native value
     */
    public unwrap(): u8{
        return this._value;
    }
    
    /**
    * @description Encodes Byte as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        return [this.value];
    }

    /**
    * @description The length of Byte when the value is encoded
    */
    public encodedLength (): i32 {
        return this.bitLength;
    }

    /** Instantiates new Byte from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): Byte {
        assert(value.length == 1, 'Byte: cannot decode invalid type');
        return new Byte(value[0]);
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