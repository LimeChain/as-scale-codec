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

import { Bool } from "../Bool";

describe("Bool", () => {

    it("should encode bool with true", () => {
        let v = new Bool(true);
        expect<u8[]>(v.toU8a()).toStrictEqual([0x01]);
    });

    it("should encode bool with false", () => {
        let v = new Bool(false);
        expect<u8[]>(v.toU8a()).toStrictEqual([0x00]);
    });

    it("should instantiate true Bool from U8Array", () => {
        expect<Bool>(Bool.fromU8a([0x01])).toStrictEqual(new Bool(true));
    });

    it("should instantiate false Bool from U8Array", () => {
        expect<Bool>(Bool.fromU8a([0x00])).toStrictEqual(new Bool(false));
    });

    it('should read only first byte at current position', () => {
        expect<Bool>(Bool.fromU8a([0x00, 0x01, 0xff], 1)).toStrictEqual(new Bool(true));
        expect<Bool>(Bool.fromU8a([0x00, 0x0f, 0xff, 0x00], 3)).toStrictEqual(new Bool(false));
    });

    itThrows('when provided invalid bool value', () => {
        Bool.fromU8a([0x05]);
    })

});
