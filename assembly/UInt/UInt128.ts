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
import {BIT_LENGTH, Bytes} from "../utils/Bytes";
import {Codec} from "../interfaces/Codec";

/** Representation for a UInt128 value in the system. */
export class UInt128 implements Codec {

    public value: u128;
    protected bitLength: i32;

    constructor (value: u128 = u128.Zero) {
        this.value = value;

        if (value < u128.fromU32(1 << 6)) this.bitLength = BIT_LENGTH.INT_8;
        else if (value < u128.fromU32(1 << 14)) this.bitLength = BIT_LENGTH.INT_16;
        else if (value < u128.fromU32(1 << 30)) this.bitLength = BIT_LENGTH.INT_32;
        else {
            const valueInBytes = this.value.toBytes();
            Bytes.trimEmptyBytes(valueInBytes);
            this.bitLength = 1 + valueInBytes.length;
        }
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void{
        assert(bytes.length - index != 0, 'Invalid input: Byte array should not be empty');
        const mode = bytes[index] & 0x03;
        if (i32(mode) <= 2) {
            this.value = new u128(u64(Bytes.decodeSmallInt(bytes, mode).value), 0);
            return ;
        }
        const topSixBits = bytes[index] >> 2;
        const byteLength = topSixBits + 4;

        const value = bytes.slice(index + 1, byteLength + 1);
        Bytes.appendZeroBytes(value, BIT_LENGTH.INT_128);
        this.value = u128.fromBytesLE(value);
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    toU8a (): u8[] {
        const bytes = new Array<u8>();
        if (this.value < u128.fromU32(1 << 6)) { // if value < 1 << 6
            Bytes.appendUint<u8>(bytes, u8(this.value.as<u8>()) << 2, BIT_LENGTH.INT_8); // 1 byte
        } else if (this.value < u128.fromU32(1 << 14)) { // if value < 1 << 14
            Bytes.appendUint<u16>(bytes, u16(this.value.as<u16>() << 2) + 1, BIT_LENGTH.INT_16); // 2 bytes
        } else if (this.value < u128.fromU64(1 << 30)) { // if value < 1 << 30
            Bytes.appendUint<u32>(bytes, u32(this.value.as<u32>() << 2) + 2, BIT_LENGTH.INT_32); // 4 bytes
        } else {
            const valueInBytes = this.value.toBytes();
            Bytes.trimEmptyBytes(valueInBytes);

            const topSixBits: u8 = u8(valueInBytes.length - 4);
            const lengthByte: u8 = (topSixBits << 2) + 3;

            // Encode Mode and Bytes length
            bytes.push(lengthByte);
            // copy the u128 bytes
            Bytes.copy(valueInBytes, bytes, 1);
        }
        return bytes;
    }

    toString(): string {
        return this.value.toString();
    }

    /**
     * @description The length of Int when the value is encoded
     */
    public encodedLength (): i32 {
        return this.bitLength;
    }

    /** Instantiates new UInt128 from u8[] SCALE encoded bytes */
    static fromU8a(input: u8[]): UInt128 {
        assert(input.length != 0, 'Invalid input: Byte array should not be empty');
        const mode = input[0] & 0x03;
        if (i32(mode) <= 2) {
            return new UInt128(new u128(u64(Bytes.decodeSmallInt(input, mode).value), 0));
        }

        const topSixBits = input[0] >> 2;
        const byteLength = topSixBits + 4;

        const value = input.slice(1, byteLength + 1);
        Bytes.appendZeroBytes(value, BIT_LENGTH.INT_128);

        return new UInt128(u128.fromBytesLE(value));
    }

    @inline @operator('==')
    static eq(a: UInt128, b: UInt128): bool {
        return a.value == b.value;
    }

    @inline @operator('!=')
    static notEq(a: UInt128, b: UInt128): bool {
        return a.value != b.value;
    }

    // Commonly used values of UInt128
    @inline static get Zero(): UInt128 { return new UInt128(u128.Zero); }
    @inline static get One(): UInt128 { return new UInt128(u128.One); }
    @inline static get Min(): UInt128 { return new UInt128(new u128()); }
    @inline static get Max(): UInt128 { return new UInt128(new u128(-1, -1)); }
}
