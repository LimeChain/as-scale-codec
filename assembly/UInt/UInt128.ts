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

import { u128 } from "as-bignum";
import { UnwrappableCodec } from "../interfaces/UnwrappableCodec";
import { ArrayUtils } from "../utils/Arrays";
import { BIT_LENGTH } from "../utils/Bytes";

/** Representation for a UInt128 value in the system. */
export class UInt128 implements UnwrappableCodec<u128> {

    private _value: u128;
    
    constructor (value: u128 = u128.Zero) {
        this._value = value;
    }

    /**
     * @description Return inner value
     */
    unwrap(): u128{
        return this._value;
    }
    
    /** 
     * @description Encodes the value as u8[] as per the SCALE codec specification 
     * */
    toU8a (): u8[] {
        return ArrayUtils.toU8Array(this._value.toUint8Array(false));
    }
    
    toString(): string {
        return this._value.toString();
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void{
        assert(bytes.length - index > 0, 'Invalid input: Byte array should not be empty');
        this._value = u128.fromBytesLE(bytes.slice(index));
    }
    /**
     * @description The length of Int when the value is encoded
     */
    public encodedLength (): i32 {
        return BIT_LENGTH.INT_128;
    }

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(input: u8[], index: i32 = 0): UInt128 {
        assert(input.length - index != 0, 'Invalid input: Byte array should not be empty');
        return new UInt128(u128.fromBytesLE(input.slice(index)));
    }

    eq(other: UInt128): bool {
        return this._value == other.unwrap();
    }

    notEq(other: UInt128): bool {
        return this._value != other.unwrap();
    }

    // Commonly used values of UInt128
    @inline static get Zero(): UInt128 { return new UInt128(u128.Zero); }
    @inline static get One(): UInt128 { return new UInt128(u128.One); }
    @inline static get Min(): UInt128 { return new UInt128(new u128()); }
    @inline static get Max(): UInt128 { return new UInt128(new u128(-1, -1)); }

    static eq(a: UInt128, b: UInt128): bool {
        return a.eq(b);
    }

    static notEq(a: UInt128, b: UInt128): bool {
        return a.notEq(b);
    }
}
