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

/** Representation for a boolean value in the system. */
export class Bool implements Codec {

    public readonly value: bool;

    constructor (value: bool) {
        this.value = value;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification
     * true -> [1]
     * false -> [0]
     */
    toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(1);
        bytesEncoded[0] = this.value ? 0x01 : 0x00;
        return bytesEncoded;
    }

    /**
     * @description Returns the string representation of the value
     */
    toString (): string {
        return `${this.value}`;
    }

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    public encodedLength (): i32 {
        return 1;
    }

    /** Instantiates new Bool from u8[] SCALE encoded bytes */
    static fromU8a (value: u8[], index: i32 = 0): Bool {
        assert(value.length > 0 && (value[index] == 1 || value[index] == 0), 'Bool: Cannot decode invalid input');

        return new Bool(value[index] == 1);
    }

    @inline @operator('==')
    static eq(a: Bool, b: Bool): bool {
        return a.value == b.value;
    }

    @inline @operator('!=')
    static notEq(a: Bool, b: Bool): bool {
        return a.value != b.value;
    }
}
