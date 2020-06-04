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

import { AbstractArray } from "./AbstractArray";
import { DecodedData } from "../interfaces/DecodedData";
import { UInt128 } from "../UInt/UInt128";
import { u128 } from "as-bignum";

export class UInt128Array extends AbstractArray<UInt128, u128> {

    /**
    * @description BoolArray elements decryption implementation
    */
    public decodeElement (value: u8[]): DecodedData<u128> {
        const u128Instance = UInt128.fromU8a(value);

        return new DecodedData<u128>(
            u128Instance.value,
            u128Instance.encodedLength()
        )
    }

    /**
    * @description Instantiates ScaleIntArray from u8[] SCALE encoded bytes (Decode)
    */
    static fromU8a (input: u8[]): UInt128Array {
        return AbstractArray.fromU8a<UInt128Array>(input);
    }
}

