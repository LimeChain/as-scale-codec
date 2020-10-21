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

import { Bytes, BIT_LENGTH } from "../utils/Bytes";
import { AbstractInt } from "../AbstractInt";

/** Representation for a UInt32 value in the system. */
export class UInt32 extends AbstractInt<i32> {

    constructor (value: u32) {
        super(value, BIT_LENGTH.INT_32)
    }

    /** Instantiates new UInt32 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[], index: i32 = 0): UInt32 {
        assert(value.length > 0, 'UInt32: Invalid bytes provided');
        var res = Bytes.toUint<u32>(value, BIT_LENGTH.INT_32, index);
        return new UInt32(res);
    }

    @inline @operator('==')
    static eq(a: UInt32, b: UInt32): bool {
        return a.value == b.value;
    }

    @inline @operator('!=')
    static notEq(a: UInt32, b: UInt32): bool {
        return a.value != b.value;
    }
}
