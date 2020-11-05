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

/**
 * @name Codec
 * @description
 * !!!IMPORTANT!!! Interfaces are not yet supported in AssemblyScript.
 * The interface will be enforced only by the Editor and not the Compiler!
 * The base Codec interface. All supported types by the library must implement this interface.
 * This interface represents the base functions required by every encoding/decoding of types
 */
export interface Codec {

    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specification
     */
    toU8a(): u8[];

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    encodedLength(): i32;

    populateFromBytes(bytes: u8[], index: i32): void;
}