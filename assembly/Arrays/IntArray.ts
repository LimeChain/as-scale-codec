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

import { CompactInt } from "../Int/CompactInt";
import { AbstractArray } from "./AbstractArray";

import { DecodedData } from "../interfaces/DecodedData";
import { ArrayUtils } from "../utils/Arrays";

// @ts-ignore
export class IntArray extends AbstractArray<CompactInt, i64> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<u64> {
        const compactInt = CompactInt.fromU8a(value);

        return new DecodedData<u64>(
            compactInt.value,
            compactInt.encodedLength()
        )
    }

    /**
    * @description Instantiates ScaleIntArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): IntArray {
        return AbstractArray.fromU8a<IntArray>(input);
    }

    @inline @operator('==')
    static eq(a: IntArray, b: IntArray): bool {
        return ArrayUtils.areEqual(a, b);
    }

    @inline @operator('!=')
    static notEq(a: IntArray, b: IntArray): bool {
        return !ArrayUtils.areEqual(a, b);
    }
}

