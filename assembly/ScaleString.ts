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

import { Bytes } from "./utils/Bytes"
import { ByteArray } from "./Arrays/ByteArray";

export class ScaleString extends ByteArray {

    public readonly value: string;

    constructor (input: string) {
        super([]);
        this.value = input;

        const inputBuffer: ArrayBuffer = String.UTF8.encode(input);
        const u8Input = Uint8Array.wrap(inputBuffer);

        for (let i = 0; i < u8Input.length; i++) {
            this[i] = u8Input[i];
        }
    }

    /**
     * @description Returns the string representation
     */
    toString (): string {
        return this.value;
    }

    /**
    * @description Instantiates String from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): ScaleString {
        const bytesLength = i32(Bytes.decodeCompactInt(input).value);
        const stringStart = i32(input.length - bytesLength);

        if (stringStart < 1) {
            throw new Error('Incorrectly encoded input');
        }

        const bytes = input.slice(stringStart);
        const buff = new Uint8Array(bytesLength);
        Bytes.copyToTyped(bytes, buff);

        return new ScaleString(String.UTF8.decode(buff.buffer));
    }
}

