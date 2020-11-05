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

    public valueStr: string;

    constructor (input: string = "") {
        super([]);
        this.valueStr = input;

        const inputBuffer: ArrayBuffer = String.UTF8.encode(input);
        const u8Input = Uint8Array.wrap(inputBuffer);

        for (let i = 0; i < u8Input.length; i++) {
            this.values[i] = u8Input[i];
        }
    }
    /**
     * @description Non-static constructor method used to populate defined properties of the model
     * @param bytes SCALE encoded bytes
     * @param index index to start decoding the bytes from
     */
    populateFromBytes(bytes: u8[], index: i32 = 0): void{
        const len = Bytes.decodeCompactInt(bytes, index);
        const bytesLength = i32(len.value);
        const stringStart = i32(len.decBytes);
        assert(bytes.length - index - len.decBytes >= 1, "ScaleString: Incorrectly encoded input");
        const buff = new Uint8Array(bytesLength);
        Bytes.copyToTyped(bytes, buff, 0, index+stringStart);
        // constructor
        this.valueStr = String.UTF8.decode(buff.buffer);
        const inputBuffer: ArrayBuffer = String.UTF8.encode(String.UTF8.decode(buff.buffer));
        const u8Input = Uint8Array.wrap(inputBuffer);

        for (let i = 0; i < u8Input.length; i++) {
            this.values[i] = u8Input[i];
        }
    }

    /**
     * @description Returns the string representation
     */
    toString (): string {
        return this.valueStr;
    }

    /**
    * @description Instantiates String from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[], index: i32 = 0): ScaleString {
        const len = Bytes.decodeCompactInt(input, index);
        const bytesLength = i32(len.value);
        const stringStart = i32(len.decBytes);

        assert(input.length - index - len.decBytes >= 1, "ScaleString: Incorrectly encoded input");

        const buff = new Uint8Array(bytesLength);
        Bytes.copyToTyped(input, buff, 0, index + stringStart);

        return new ScaleString(String.UTF8.decode(buff.buffer));
    }
}

