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
import { Bytes } from "./utils/Bytes";

/** Representation for a Int value in the system. */
export abstract class AbstractInt<T extends number> implements Codec, UnwrappableCodec<T> {

    protected bitLength: i32;
    private _value: T;
    
    get value(): T{
        return this._value;
    }

    constructor (value: T, bitLength: i32) {
        this._value = value;
        this.bitLength = bitLength;
    }

    /**
     * @description Returns the inner native value
     */
    public unwrap(): T{
        return this._value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    public toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(this.bitLength);
        Bytes.putUint<T>(bytesEncoded, this.value, this.bitLength);
        return bytesEncoded;
    }

    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    public populateFromBytes(bytes: u8[], index: i32 = 0): void {
        assert(bytes.length - index > 0, "AbstractInt: Invalid bytes provided");
        this._value = Bytes.toUint<T>(bytes, this.bitLength, index);
    }

    /**
     * @description Returns the string representation of the value
     */
    toString (): string {
        return this.value.toString();
    }
    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength (): i32 {
        return this.bitLength;
    }
}
