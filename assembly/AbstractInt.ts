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
import { Bytes, BIT_LENGTH } from "./utils/Bytes";

/** Representation for a Int value in the system. */
export abstract class AbstractInt<T extends number> implements Codec {

    protected bitLength: i32;
    public readonly value: T;

    constructor (value: T, bitLength: i32) {
        this.value = value;
        this.bitLength = bitLength;
    }

    /** Encodes the value as u8[] as per the SCALE codec specification */
    public toU8a (): u8[] {
        let bytesEncoded = new Array<u8>(this.bitLength);
        Bytes.putUint<T>(bytesEncoded, this.value, this.bitLength);
        return bytesEncoded;
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
