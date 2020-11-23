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

import { UInt8 } from "../UInt/UInt8";
import { UInt16 } from "../UInt/UInt16";
import { UInt32 } from "../UInt/UInt32";
import { UInt64 } from "../UInt/UInt64";
import {UInt128} from "../UInt/UInt128";
import { u128 } from "as-bignum";

describe("UInt8", () => {

    it("should encode uint8", () => {
        let v1 = new UInt8(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01]);
        expect<i32>(v1.encodedLength()).toStrictEqual(1);

        let v2 = new UInt8(15);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xf]);
        expect<i32>(v2.encodedLength()).toStrictEqual(1);

        let v3 = new UInt8(16);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0x10]);
        expect<i32>(v3.encodedLength()).toStrictEqual(1);

        let v4 = new UInt8(127);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0x7f]);
        expect<i32>(v4.encodedLength()).toStrictEqual(1);

        let v5 = new UInt8(255);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(1);

        let v6 = new UInt8(241);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0xf1]);
        expect<i32>(v6.encodedLength()).toStrictEqual(1);

        let v7 = new UInt8(129);
        expect<u8[]>(v7.toU8a()).toStrictEqual([0x81]);
        expect<i32>(v7.encodedLength()).toStrictEqual(1);
    });

    it("should decode uint8", () => {
        expect<UInt8>(UInt8.fromU8a([0x01])).toStrictEqual(new UInt8(1));
        expect<UInt8>(UInt8.fromU8a([0xf])).toStrictEqual(new UInt8(15));
        expect<UInt8>(UInt8.fromU8a([0x10])).toStrictEqual(new UInt8(16));
        expect<UInt8>(UInt8.fromU8a([0xf1])).toStrictEqual(new UInt8(241));
        expect<UInt8>(UInt8.fromU8a([0x81])).toStrictEqual(new UInt8(129));
    });

    it("should decode uint8 with populate method", () => {
        const uInt8 = new UInt8();
        uInt8.populateFromBytes([0x7f]);
        expect<UInt8>(uInt8).toStrictEqual(new UInt8(127));
        uInt8.populateFromBytes([0xff]);
        expect<UInt8>(uInt8).toStrictEqual(new UInt8(255));
        uInt8.populateFromBytes([1]);
        expect<UInt8>(uInt8).toStrictEqual(new UInt8(1));
        uInt8.populateFromBytes([69]);
        expect<UInt8>(uInt8).toStrictEqual(new UInt8(69));
    });

    it("should decode only first byte", () => {
        expect<UInt8>(UInt8.fromU8a([0x05, 0])).toStrictEqual(new UInt8(5));
        expect<UInt8>(UInt8.fromU8a([0x01, 0, 1, 2, 12])).toStrictEqual(new UInt8(1));
    });

    itThrows('should throw when empty array is provided', () => {
        let v1 = UInt8.fromU8a([]);
    });
    itThrows('should throw when index is out of range', () => {
        let v1 = UInt8.fromU8a([1], 2);
    });

});

describe("UInt16", () => {

    it("should encode uint16", () => {
        let v1 = new UInt16(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0]);
        expect<i32>(v1.encodedLength()).toStrictEqual(2);

        let v2 = new UInt16(15);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xf, 0]);
        expect<i32>(v2.encodedLength()).toStrictEqual(2);

        let v3 = new UInt16(16);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0x10, 0]);
        expect<i32>(v3.encodedLength()).toStrictEqual(2);

        let v4 = new UInt16(127);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0x7f, 0]);
        expect<i32>(v4.encodedLength()).toStrictEqual(2);

        let v5 = new UInt16(65535);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0xff, 0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(2);

        let v6 = new UInt16(65521);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0xf1, 0xff]);
        expect<i32>(v6.encodedLength()).toStrictEqual(2);

        let v7 = new UInt16(65409);
        expect<u8[]>(v7.toU8a()).toStrictEqual([0x81, 0xff]);
        expect<i32>(v7.encodedLength()).toStrictEqual(2);

        let v8 = new UInt16(15000);
        expect<u8[]>(v8.toU8a()).toStrictEqual([0x98, 0x3a]);
        expect<i32>(v8.encodedLength()).toStrictEqual(2);

        let v9 = new UInt16(16383);
        expect<u8[]>(v9.toU8a()).toStrictEqual([0xff, 0x3f]);
        expect<i32>(v9.encodedLength()).toStrictEqual(2);

        let v10 = new UInt16(50536);
        expect<u8[]>(v10.toU8a()).toStrictEqual([0x68, 0xc5]);
        expect<i32>(v10.encodedLength()).toStrictEqual(2);

        let v11 = new UInt16(49153);
        expect<u8[]>(v11.toU8a()).toStrictEqual([0x01, 0xc0]);
        expect<i32>(v11.encodedLength()).toStrictEqual(2);
    });

    it("should decode uint16", () => {
        expect<UInt16>(UInt16.fromU8a([0x01, 0])).toStrictEqual(new UInt16(1));
        expect<UInt16>(UInt16.fromU8a([0xf, 0])).toStrictEqual(new UInt16(15));
        expect<UInt16>(UInt16.fromU8a([0x10, 0])).toStrictEqual(new UInt16(16));
        expect<UInt16>(UInt16.fromU8a([0x81, 0xff])).toStrictEqual(new UInt16(65409));
        expect<UInt16>(UInt16.fromU8a([0x98, 0x3a])).toStrictEqual(new UInt16(15000));
        expect<UInt16>(UInt16.fromU8a([0xff, 0x3f])).toStrictEqual(new UInt16(16383));
        expect<UInt16>(UInt16.fromU8a([0x68, 0xc5])).toStrictEqual(new UInt16(50536));
        expect<UInt16>(UInt16.fromU8a([0x01, 0xc0])).toStrictEqual(new UInt16(49153));
    });

    it("should decode uInt16 with populate method", () => {
        const uInt16 = new UInt16();
        uInt16.populateFromBytes([0x7f, 0]);
        expect<UInt16>(uInt16).toStrictEqual(new UInt16(127));
        uInt16.populateFromBytes([0xff, 0xff]);
        expect<UInt16>(uInt16).toStrictEqual(new UInt16(65535));
        uInt16.populateFromBytes([0xf1, 0xff]);
        expect<UInt16>(uInt16).toStrictEqual(new UInt16(65521));
        uInt16.populateFromBytes([1]);
        expect<UInt16>(uInt16).toStrictEqual(new UInt16(1));
        uInt16.populateFromBytes([123]);
        expect<UInt16>(uInt16).toStrictEqual(new UInt16(123));
    });

    it('should decode only two bytes', () => {
       expect<UInt16>(UInt16.fromU8a([0x01, 0x10, 0x00, 0x01], 1)).toStrictEqual(new UInt16(16));
    });

    itThrows('should throw when empty array is provided', () => {
        let v1 = UInt16.fromU8a([]);
    });
    itThrows('should throw when index is out of range', () => {
        let v1 = UInt16.fromU8a([1, 0, 1, 223], 4);
    });
});

describe("UInt32", () => {
    it("should encode uint32", () => {
        let v1 = new UInt32(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0, 0, 0]);
        expect<i32>(v1.encodedLength()).toStrictEqual(4);

        let v2 = new UInt32(16383);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xff, 0x3f, 0, 0]);
        expect<i32>(v2.encodedLength()).toStrictEqual(4);

        let v3 = new UInt32(1073741823);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0x3f]);
        expect<i32>(v3.encodedLength()).toStrictEqual(4);

        let v4 = new UInt32(4294967295);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0xff]);
        expect<i32>(v4.encodedLength()).toStrictEqual(4);

        let v5 = new UInt32(4294950913);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0x01, 0xc0, 0xff, 0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(4);

        let v6 = new UInt32(3221225473);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0x01, 0x00, 0x00, 0xc0]);
        expect<i32>(v6.encodedLength()).toStrictEqual(4);
    });

    it("should decode uint32", () => {
        expect<UInt32>(UInt32.fromU8a([0x01, 0, 0, 0])).toStrictEqual(new UInt32(1));
        expect<UInt32>(UInt32.fromU8a([0xff, 0xff, 0xff, 0x3f])).toStrictEqual(new UInt32(1073741823));
        expect<UInt32>(UInt32.fromU8a([0x01, 0xc0, 0xff, 0xff])).toStrictEqual(new UInt32(4294950913));
        expect<UInt32>(UInt32.fromU8a([0x01, 0x00, 0x00, 0xc0])).toStrictEqual(new UInt32(3221225473));
    });

    it("should decode uInt32 with populate method", () => {
        const uInt32 = new UInt32();
        uInt32.populateFromBytes([0xff, 0x3f, 0, 0]);
        expect<UInt32>(uInt32).toStrictEqual(new UInt32(16383));
        uInt32.populateFromBytes([0xff, 0xff, 0xff, 0x3f]);
        expect<UInt32>(uInt32).toStrictEqual(new UInt32(1073741823));
        uInt32.populateFromBytes([0xff, 0xff, 0xff, 0xff]);
        expect<UInt32>(uInt32).toStrictEqual(new UInt32(4294967295));
        uInt32.populateFromBytes([1, 0, 0, 0]);
        expect<UInt32>(uInt32).toStrictEqual(new UInt32(1));
        uInt32.populateFromBytes([123, 0, 0, 0]);
        expect<UInt32>(uInt32).toStrictEqual(new UInt32(123));
    })

    it('should decode only four bytes', () => {
        expect<UInt32>(UInt32.fromU8a([0x01, 0x01, 0x00, 0x00, 0xc0], 1)).toStrictEqual(new UInt32(3221225473));
        expect<UInt32>(UInt32.fromU8a([0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00], 3)).toStrictEqual(new UInt32(1));
     });

     itThrows('should throw when empty array is provided', () => {
        let v1 = UInt32.fromU8a([]);
    });
    itThrows('should throw when index is out of range', () => {
        let v1 = UInt32.fromU8a([1, 0, 1, 3, 123, 123, 12, 0], 9);
    });


});

describe("UInt64", () => {

    it("should encode uint64", () => {
        let v1 = new UInt64(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0, 0, 0, 0, 0, 0, 0]);
        expect<i32>(v1.encodedLength()).toStrictEqual(8);

        let v2 = new UInt64(16383);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xff, 0x3f, 0, 0, 0, 0, 0, 0]);
        expect<i32>(v2.encodedLength()).toStrictEqual(8);

        let v3 = new UInt64(1073741823);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0x3f, 0, 0, 0, 0]);
        expect<i32>(v3.encodedLength()).toStrictEqual(8);

        let v4 = new UInt64(9223372036854775807);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f]);
        expect<i32>(v4.encodedLength()).toStrictEqual(8);

        let v5 = new UInt64(18446744073709551615);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(8)

    });

    it("should decode uint64", () => {
        expect<UInt64>(UInt64.fromU8a([0x01, 0, 0, 0, 0, 0, 0, 0])).toStrictEqual(new UInt64(1));
        expect<UInt64>(UInt64.fromU8a([0xff, 0x3f, 0, 0, 0, 0, 0, 0])).toStrictEqual(new UInt64(16383));
        expect<UInt64>(UInt64.fromU8a([0xff, 0xff, 0xff, 0x3f, 0, 0, 0, 0])).toStrictEqual(new UInt64(1073741823));
        expect<UInt64>(UInt64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f])).toStrictEqual(new UInt64(9223372036854775807));
        expect<UInt64>(UInt64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])).toStrictEqual(new UInt64(18446744073709551615));
    });

    it("should decode uint64 with populate method", () => {
        const uInt64 = new UInt64();
        uInt64.populateFromBytes([0xff, 0xff, 0xff, 0x3f, 0, 0, 0, 0]);
        expect<UInt64>(uInt64).toStrictEqual(new UInt64(1073741823));
        uInt64.populateFromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f]);
        expect<UInt64>(uInt64).toStrictEqual(new UInt64(9223372036854775807));
        uInt64.populateFromBytes([1, 0, 0, 0, 0, 0, 0, 0]);
        expect<UInt64>(uInt64).toStrictEqual(new UInt64(1));
        uInt64.populateFromBytes([123, 0, 0, 0, 0, 0, 0, 0]);
        expect<UInt64>(uInt64).toStrictEqual(new UInt64(123));
    })

    it('should decode only eight bytes', () => {
        expect<UInt64>(UInt64.fromU8a([0x01, 0x01, 0xff, 0x3f, 0, 0, 0, 0, 0, 0], 2)).toStrictEqual(new UInt64(16383));
        expect<UInt64>(UInt64.fromU8a([0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0, 0, 0, 0], 3)).toStrictEqual(new UInt64(1));
     });

    itThrows('should throw when empty array is provided', () => {
        let v1 = UInt64.fromU8a([]);
    });

    itThrows('should throw when index is out of range', () => {
        let v1 = UInt64.fromU8a([1, 0, 1, 3], 13);
    });

});

describe("UInt128", () => {

    it("should encode uint128", () => {
        const v0 = new UInt128(u128.fromU32(1));
        expect<u8[]>(v0.toU8a()).toStrictEqual([0x04]);

        const v1 = new UInt128(u128.fromU32(64));
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0x01]);

        const v2 = new UInt128(u128.fromU32(16383));
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xfd, 0xff]);

        const v3 = new UInt128(u128.fromU32(16384));
        expect<u8[]>(v3.toU8a()).toStrictEqual([0x02, 0x00, 0x01, 0x00]);

        const v4 = new UInt128(u128.fromU32(1073741823));
        expect<u8[]>(v4.toU8a()).toStrictEqual([0xfe, 0xff, 0xff, 0xff]);

        const v5 = new UInt128(u128.fromU32(1073741824));
        expect<u8[]>(v5.toU8a()).toStrictEqual([0x03, 0x00, 0x00, 0x00, 0x40]);

        const v6 = new UInt128(u128.fromU32(1073745328));
        expect<u8[]>(v6.toU8a()).toStrictEqual([0x03, 0xb0, 0x0d, 0x00, 0x40]);

        const v7 = new UInt128(u128.fromU64(549755813888));
        expect<u8[]>(v7.toU8a()).toStrictEqual([0x07, 0x00, 0x00, 0x00, 0x00, 0x80]);

        const v8 = new UInt128(u128.fromU32(4294967295));
        expect<u8[]>(v8.toU8a()).toStrictEqual([0x03, 0xff, 0xff, 0xff, 0xff]);

        const v9 = new UInt128(u128.fromU32(2180));
        expect<u8[]>(v9.toU8a()).toStrictEqual([0x11, 0x22]);

        const v10 = new UInt128(u128.fromU64(3091694112222222222));
        expect<u8[]>(v10.toU8a()).toStrictEqual([0x13, 0x8e, 0x17, 0x2c, 0x21, 0x6a, 0xe7, 0xe7, 0x2a]);

        const v11 = new UInt128(u128.fromU64(18446744073709551615));
        expect<u8[]>(v11.toU8a()).toStrictEqual([0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);

        const v12 = new UInt128(u128.Max - u128.fromU64(u64.MAX_VALUE)); // 340282366920938463444927863358058659840
        expect<u8[]>(v12.toU8a()).toStrictEqual([0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);

    });

    it("should decode uint128", () => {
        const v0 = UInt128.fromU8a([0x00]);
        expect<string>(v0.toString()).toStrictEqual("0");

        const v1 = UInt128.fromU8a([0x04]);
        expect<string>(v1.toString()).toStrictEqual("1");

        const v2 = UInt128.fromU8a([0xfc]);
        expect<string>(v2.toString()).toStrictEqual("63");

        const v3 = UInt128.fromU8a([0xfd, 0xff]);
        expect<string>(v3.toString()).toStrictEqual("16383");

        const v4 = UInt128.fromU8a([0x02, 0x00, 0x01, 0x00]);
        expect<string>(v4.toString()).toStrictEqual("16384");

        const v5 = UInt128.fromU8a([0xfe, 0xff, 0xff, 0xff]);
        expect<string>(v5.toString()).toStrictEqual("1073741823");

        const v6 = UInt128.fromU8a([0x03, 0x00, 0x00, 0x00, 0x40]);
        expect<string>(v6.toString()).toStrictEqual("1073741824");

        const v7 = UInt128.fromU8a([0x03, 0xb0, 0x0d, 0x00, 0x40]);
        expect<string>(v7.toString()).toStrictEqual("1073745328");

        const v8 = UInt128.fromU8a([0x03, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v8.toString()).toStrictEqual("4294967295");

        const v9 = UInt128.fromU8a([ 0x13, 0x8e, 0x17, 0x2c, 0x21, 0x6a, 0xe7, 0xe7, 0x2a]);
        expect<string>(v9.toString()).toStrictEqual("3091694112222222222");

        // Reads only the upper 6 bits and the following byte
        const v13 = UInt128.fromU8a([ 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff, 0x12]);
        expect<string>(v13.toString()).toStrictEqual("2180");
        
        const v10 = UInt128.fromU8a([0x33, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v10.toString()).toStrictEqual("340282366920938463444927863358058659840");

        const v11 = UInt128.fromU8a([0x2b, 0x00, 0x01, 0xfa, 0xcb, 0xaa, 0x15, 0x10, 0x05, 0x04, 0x11]);
        expect<string>(v11.toString()).toStrictEqual("80354382000471934632192");

        const v12 = UInt128.fromU8a([0x43, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v12.toString()).toStrictEqual("1329227995784915872903807060280344575");
    });

    it("should decode uint128 with populate method", () => {
        const v1 = new UInt128();
        v1.populateFromBytes([0x07, 0x00, 0x00, 0x00, 0x00, 0x80]);
        expect<string>(v1.toString()).toStrictEqual("549755813888");

        const v2 = new UInt128();
        v2.populateFromBytes([ 0x11, 0x22]);
        expect<string>(v2.toString()).toStrictEqual("2180");

        const v3 = new UInt128();
        v3.populateFromBytes([0x01, 0x01]);
        expect<string>(v3.toString()).toStrictEqual("64");

        const v4 = new UInt128();
        v4.populateFromBytes([0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v4.toString()).toStrictEqual("18446744073709551615");
        
        const v5 = new UInt128();
        v5.populateFromBytes([0x2b, 0x00, 0x01, 0xfa, 0xcb, 0xaa, 0x15, 0x10, 0x05, 0x04, 0x11]);
        expect<string>(v5.toString()).toStrictEqual("80354382000471934632192");

        const v6 = new UInt128();
        v6.populateFromBytes([0x13, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v6.toString()).toStrictEqual("18446744073709551615");
    });

    itThrows('should throw when decoding empty array', () => {
        const v1 = UInt128.fromU8a([]);
    })

});