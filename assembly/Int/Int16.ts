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

/** Representation for a Int16 value in the system. */
export class Int16 extends AbstractInt<i16>  {

    constructor (value: i16) {
        super(value, BIT_LENGTH.INT_16)
    }

    /** Instantiates new Int16 from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[], curIndex:i32 = 0): Int16 {
        value = curIndex ? value.slice(curIndex) : value;
        assert(value.length > 0, 'Int16: Empty bytes array provided');
        var res = Bytes.toUint<u16>(value, BIT_LENGTH.INT_16);
        return new Int16(res);
    }

    @inline @operator('==')
    static eq(a: Int16, b: Int16): bool {
        return a.value == b.value;
    }

    @inline @operator('!=')
    static notEq(a: Int16, b: Int16): bool {
        return a.value != b.value;
    }
}
