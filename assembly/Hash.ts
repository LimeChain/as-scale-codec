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

import { Bytes } from './utils/Bytes';

export class Hash {

    public values: Array<u8>;

    constructor(value: u8[]) {
        this.values = new Array<u8>(32);
        Bytes.copy(value, this.values);
    }

    /**
    * @description  Encodes Hash as u8[] as per the SCALE codec specification
    */
    public toU8a (): u8[] {
        const result: u8[] = new Array<u8>(this.encodedLength());
        Bytes.copy<u8>(this.values, result);

        return result;
    }

    /**
    * @description  Return string representation of Hash
    */
    public toString (): string {
        return "0x" + this.values.join('');
    }

    /**
    * @description  Instantiate Hash from bytes cropped from the left.
    */
    static bytesToHash (bytes: u8[]): Hash {
        let hash = new Hash([]);
        if (bytes.length > 32) {
            bytes = bytes.slice(bytes.length - 32);
        }

        const position: i32 = 32 - bytes.length;
        Bytes.copy<u8>(bytes, hash.values, position);
        return hash;
    }

    /**
    * @description The length of encoded Hash
    */
    public encodedLength (): i32 {
        return 32;
    }

    /**
    * @description Instantiates Hash from u8[] SCALE encoded bytes
    */
    static fromU8a (input: u8[], index: i32 = 0): Hash {
        return new Hash(input.slice(index));
    }

    @inline @operator('==')
    static eq(a: Hash, b: Hash): bool {
        let areEqual = true;
        for (let i = 0; i < a.values.length; i++) {
            if (a.values[i] != b.values[i]) {
                areEqual = false;
                break;
            }
        }
        return areEqual;
    }

    @inline @operator('!=')
    static notEq(a: Hash, b: Hash): bool {
        return !Hash.eq(a, b);
    }
}
