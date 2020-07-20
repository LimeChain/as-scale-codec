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

/** Representation for a UInt64 value in the system. */
export class UInt64 extends AbstractInt<u64> {

    constructor (value: u64) {
        super(value, BIT_LENGTH.INT_64)
    }

    /** Instantiates new UInt64 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[]): UInt64 {
        assert(value.length <= BIT_LENGTH.INT_64, "UInt64: invalid bytes provided");
        var res = Bytes.toUint<u64>(value, BIT_LENGTH.INT_64);
        return new UInt64(res);
    }

    @inline @operator('==')
    static eq(a: UInt64, b: UInt64): bool {
        return a.value == b.value;
    }

    @inline @operator('!=')
    static notEq(a: UInt64, b: UInt64): bool {
        return a.value != b.value;
    }
}
