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

import { Bool, Byte, ScaleString, Hash, CompactInt } from "as-scale-codec"
import { Int8, Int16, Int32, Int64 } from "as-scale-codec"
import { UInt8, UInt16, UInt32, UInt64, UInt128 } from "as-scale-codec"
import { u128 } from "as-bignum"

export function demonstrate(): void {
    
    trace(`Encoding examples:`)

    // Bool
    const scaleBool = new Bool(true);
    trace("bool(true) -> " + scaleBool.toU8a().toString());

    // Byte
    const scaleByte = new Byte(0x01);
    trace("Byte(0x01) -> " + scaleByte.toU8a().toString());

    // String
    const scaleString = new ScaleString("a");
    trace("String(a) -> " + scaleString.toU8a().toString())

    // Hash
    const scaleHash = new Hash([0xff, 0x00, 0xab]);
    trace("Hash([0xff, 0x00, 0xab]) -> " + scaleHash.toU8a().toString()); // => [0xff, 0x00, 0xab, 0x00, ... 0x00] (32 bytes long)

    // Compact Int
    const scaleCompactInt = new CompactInt(1);
    trace("CompactInt(1) ->  " + scaleCompactInt.toU8a().toString()); // => [0x04]

    // Int
    const scaleInt8 = new Int8(-1);
    trace("Int8(-1) -> " + scaleInt8.toU8a().toString()); // => [0xff]

    const scaleInt16 = new Int16(-1);
    trace("Int16(-1) -> " + scaleInt16.toU8a().toString()) // => [0xff, 0xff]

    const scaleInt32 = new Int32(-1);
    trace("Int32(-1) -> " + scaleInt32.toU8a().toString()) // => [0xff, 0xff, 0xff, 0xff]

    const scaleInt64 = new Int64(-1);
    trace("Int64(-1)  -> " + scaleInt64.toU8a().toString()) // => [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]

    const scaleUInt8 = new UInt8(1);
    trace("UInt8(1)  -> " + scaleUInt8.toU8a().toString()) // => [0x01]

    const scaleUInt16 = new UInt16(1);
    trace("Uint16(1) -> " + scaleUInt16.toU8a().toString()) // => [0x01, 0x00]

    const scaleUInt32 = new UInt32(1);
    trace("Uint32(1) -> " + scaleUInt32.toU8a().toString()) // => [0x01, 0x00, 0x00, 0x00]

    const scaleUInt64 = new UInt64(1);
    trace("Uint64(1) -> " + scaleUInt64.toU8a().toString()); // => [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

    const scaleUInt128 = new UInt128(u128.fromU64(18446744073709551615));
    trace("Uint128(18446744073709551615) -> " + scaleUInt128.toU8a().toString()); // => [0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]

    trace("Bool [0x01] -> " + Bool.fromU8a([0x01]).value.toString());
    trace("Byte [0x01] -> " + Byte.fromU8a([0x01]).value.toString());

    const decodeStr = ScaleString.fromU8a([0x04, 0x61]);
    trace("String [0x04, 0x61] -> " + decodeStr.valueStr.toString());
    const decodeHash = Hash.fromU8a([0xff, 0x00, 0xab]);
    trace("Hash [0xff, 0x00, 0xab] -> " + decodeHash.toString())
    trace("CompactInt [0x04] -> " + CompactInt.fromU8a([0x04]).value.toString());
    trace("Int8 [0xff] -> " + Int8.fromU8a([0xff]).value.toString());
    trace("Int16 [0xff, 0xff] -> " + Int16.fromU8a([0xff, 0xff]).value.toString());
    trace("Int32 [0xff, 0xff, 0xff, 0xff] -> " + Int32.fromU8a([0xff, 0xff, 0xff, 0xff]).toString());
    trace("Int64 [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] -> " + Int64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).value.toString())

    trace("UInt8 [0x01] -> " + UInt8.fromU8a([0x01]).value.toString());
    trace("UInt16 [0x01, 0x00] -> " + UInt16.fromU8a([0x01, 0x00]).value.toString());
    trace("UInt32 [0x01, 0x00, 0x00, 0x00] -> " + UInt32.fromU8a([0x01, 0x00, 0x00, 0x00]).toString());
    trace("UInt64 [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00] -> " + UInt64.fromU8a([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).value.toString())
    trace("UInt128 [0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] -> " + UInt128.fromU8a([0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).toString());
}