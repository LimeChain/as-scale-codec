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

import { ScaleString } from "as-scale-codec";

/** Encodes 'hello_world' into SCALE format **/
export function encodeString (input: string): u8[] {
    const scalesString = new ScaleString(input);
    return scalesString.toU8a();
}

/** Decodes 'hello_world' from SCALE format **/
export function decodeString (input: u8[]): string {
    const scaleString = ScaleString.fromU8a(input);
    return scaleString.value;
}

export const U8Array_ID = idof<u8[]>();
