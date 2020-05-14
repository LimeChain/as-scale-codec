import { Int8 } from "../Int8";
import { Int16 } from "../Int16";
import { Int32 } from "../Int32";
import { Int64 } from "../Int64";

describe("Int8", () => {

    it("should encode int8", () => {
        let v1 = new Int8(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01]);
        expect<i32>(v1.encodedLength()).toStrictEqual(1);

        let v2 = new Int8(15);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xf]);
        expect<i32>(v2.encodedLength()).toStrictEqual(1);

        let v3 = new Int8(16);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0x10]);
        expect<i32>(v3.encodedLength()).toStrictEqual(1);

        let v4 = new Int8(127);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0x7f]);
        expect<i32>(v4.encodedLength()).toStrictEqual(1);

        let v5 = new Int8(-1);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(1);

        let v6 = new Int8(-15);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0xf1]);
        expect<i32>(v6.encodedLength()).toStrictEqual(1);

        let v7 = new Int8(-127);
        expect<u8[]>(v7.toU8a()).toStrictEqual([0x81]);
        expect<i32>(v7.encodedLength()).toStrictEqual(1);
    })

    it("should decode int8", () => {
        expect<Int8>(Int8.fromU8a([0x01])).toStrictEqual(new Int8(1));
        expect<Int8>(Int8.fromU8a([0xf])).toStrictEqual(new Int8(15));
        expect<Int8>(Int8.fromU8a([0x10])).toStrictEqual(new Int8(16));
        expect<Int8>(Int8.fromU8a([0x7f])).toStrictEqual(new Int8(127));
        expect<Int8>(Int8.fromU8a([0xff])).toStrictEqual(new Int8(-1));
        expect<Int8>(Int8.fromU8a([0xf1])).toStrictEqual(new Int8(-15));
        expect<Int8>(Int8.fromU8a([0x81])).toStrictEqual(new Int8(-127));
    })
});

describe("Int16", () => {

    it("should encode int16", () => {
        let v1 = new Int16(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0]);
        expect<i32>(v1.encodedLength()).toStrictEqual(2);

        let v2 = new Int16(15);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xf, 0]);
        expect<i32>(v2.encodedLength()).toStrictEqual(2);

        let v3 = new Int16(16);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0x10, 0]);
        expect<i32>(v3.encodedLength()).toStrictEqual(2);

        let v4 = new Int16(127);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0x7f, 0]);
        expect<i32>(v4.encodedLength()).toStrictEqual(2);

        let v5 = new Int16(-1);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0xff, 0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(2);

        let v6 = new Int16(-15);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0xf1, 0xff]);
        expect<i32>(v6.encodedLength()).toStrictEqual(2);

        let v7 = new Int16(-127);
        expect<u8[]>(v7.toU8a()).toStrictEqual([0x81, 0xff]);
        expect<i32>(v7.encodedLength()).toStrictEqual(2);

        let v8 = new Int16(15000);
        expect<u8[]>(v8.toU8a()).toStrictEqual([0x98, 0x3a]);
        expect<i32>(v8.encodedLength()).toStrictEqual(2);

        let v9 = new Int16(16383);
        expect<u8[]>(v9.toU8a()).toStrictEqual([0xff, 0x3f]);
        expect<i32>(v9.encodedLength()).toStrictEqual(2);

        let v10 = new Int16(-15000);
        expect<u8[]>(v10.toU8a()).toStrictEqual([0x68, 0xc5]);
        expect<i32>(v10.encodedLength()).toStrictEqual(2);

        let v11 = new Int16(-16383);
        expect<u8[]>(v11.toU8a()).toStrictEqual([0x01, 0xc0]);
        expect<i32>(v11.encodedLength()).toStrictEqual(2);
    })

    it("should decode int16", () => {
        expect<Int16>(Int16.fromU8a([0x01, 0])).toStrictEqual(new Int16(1));
        expect<Int16>(Int16.fromU8a([0xf, 0])).toStrictEqual(new Int16(15));
        expect<Int16>(Int16.fromU8a([0x10, 0])).toStrictEqual(new Int16(16));
        expect<Int16>(Int16.fromU8a([0x7f, 0])).toStrictEqual(new Int16(127));
        expect<Int16>(Int16.fromU8a([0xff, 0xff])).toStrictEqual(new Int16(-1));
        expect<Int16>(Int16.fromU8a([0xf1, 0xff])).toStrictEqual(new Int16(-15));
        expect<Int16>(Int16.fromU8a([0x81, 0xff])).toStrictEqual(new Int16(-127));
        expect<Int16>(Int16.fromU8a([0x98, 0x3a])).toStrictEqual(new Int16(15000));
        expect<Int16>(Int16.fromU8a([0xff, 0x3f])).toStrictEqual(new Int16(16383));
        expect<Int16>(Int16.fromU8a([0x68, 0xc5])).toStrictEqual(new Int16(-15000));
        expect<Int16>(Int16.fromU8a([0x01, 0xc0])).toStrictEqual(new Int16(-16383));
    })
});

describe("Int32", () => {
    it("should encode int32", () => {
        let v1 = new Int32(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0, 0, 0]);
        expect<i32>(v1.encodedLength()).toStrictEqual(4);

        let v2 = new Int32(16383);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xff, 0x3f, 0, 0]);
        expect<i32>(v2.encodedLength()).toStrictEqual(4);

        let v3 = new Int32(1073741823);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0x3f]);
        expect<i32>(v3.encodedLength()).toStrictEqual(4);

        let v4 = new Int32(-1);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0xff]);
        expect<i32>(v4.encodedLength()).toStrictEqual(4);

        let v5 = new Int32(-16383);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0x01, 0xc0, 0xff, 0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(4);

        let v6 = new Int32(-1073741823);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0x01, 0x00, 0x00, 0xc0]);
        expect<i32>(v6.encodedLength()).toStrictEqual(4);
    })

    it("should decode int32", () => {
        expect<Int32>(Int32.fromU8a([0x01, 0, 0, 0])).toStrictEqual(new Int32(1));
        expect<Int32>(Int32.fromU8a([0xff, 0x3f, 0, 0])).toStrictEqual(new Int32(16383));
        expect<Int32>(Int32.fromU8a([0xff, 0xff, 0xff, 0x3f])).toStrictEqual(new Int32(1073741823));
        expect<Int32>(Int32.fromU8a([0xff, 0xff, 0xff, 0xff])).toStrictEqual(new Int32(-1));
        expect<Int32>(Int32.fromU8a([0x01, 0xc0, 0xff, 0xff])).toStrictEqual(new Int32(-16383));
        expect<Int32>(Int32.fromU8a([0x01, 0x00, 0x00, 0xc0])).toStrictEqual(new Int32(-1073741823));
    })
});

describe("Int64", () => {

    it("should encode int64", () => {
        let v1 = new Int64(1);
        expect<u8[]>(v1.toU8a()).toStrictEqual([0x01, 0, 0, 0, 0, 0, 0, 0]);
        expect<i32>(v1.encodedLength()).toStrictEqual(8);

        let v2 = new Int64(16383);
        expect<u8[]>(v2.toU8a()).toStrictEqual([0xff, 0x3f, 0, 0, 0, 0, 0, 0]);
        expect<i32>(v2.encodedLength()).toStrictEqual(8);

        let v3 = new Int64(1073741823);
        expect<u8[]>(v3.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0x3f, 0, 0, 0, 0]);
        expect<i32>(v3.encodedLength()).toStrictEqual(8);

        let v4 = new Int64(9223372036854775807);
        expect<u8[]>(v4.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f]);
        expect<i32>(v4.encodedLength()).toStrictEqual(8);

        let v5 = new Int64(-1);
        expect<u8[]>(v5.toU8a()).toStrictEqual([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<i32>(v5.encodedLength()).toStrictEqual(8);

        let v6 = new Int64(-16383);
        expect<u8[]>(v6.toU8a()).toStrictEqual([0x01, 0xc0, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<i32>(v6.encodedLength()).toStrictEqual(8);

        let v7 = new Int64(-1073741823);
        expect<u8[]>(v7.toU8a()).toStrictEqual([0x01, 0x00, 0x00, 0xc0, 0xff, 0xff, 0xff, 0xff]);
        expect<i32>(v7.encodedLength()).toStrictEqual(8);

        let v8 = new Int64(-9223372036854775807);
        expect<u8[]>(v8.toU8a()).toStrictEqual([0x01, 0, 0, 0, 0, 0, 0, 0x80]);
        expect<i32>(v8.encodedLength()).toStrictEqual(8);
    })

    it("should decode int64", () => {
        expect<Int64>(Int64.fromU8a([0x01, 0, 0, 0, 0, 0, 0, 0])).toStrictEqual(new Int64(1));
        expect<Int64>(Int64.fromU8a([0xff, 0x3f, 0, 0, 0, 0, 0, 0])).toStrictEqual(new Int64(16383));
        expect<Int64>(Int64.fromU8a([0xff, 0xff, 0xff, 0x3f, 0, 0, 0, 0])).toStrictEqual(new Int64(1073741823));
        expect<Int64>(Int64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x7f])).toStrictEqual(new Int64(9223372036854775807));
        expect<Int64>(Int64.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])).toStrictEqual(new Int64(-1));
        expect<Int64>(Int64.fromU8a([0x01, 0xc0, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])).toStrictEqual(new Int64(-16383));
        expect<Int64>(Int64.fromU8a([0x01, 0x00, 0x00, 0xc0, 0xff, 0xff, 0xff, 0xff])).toStrictEqual(new Int64(-1073741823));
        expect<Int64>(Int64.fromU8a([0x01, 0, 0, 0, 0, 0, 0, 0x80])).toStrictEqual(new Int64(-9223372036854775807));
    })

});