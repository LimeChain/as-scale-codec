import {UInt128} from "../UInt/UInt128";

describe("BigInt", () => {

    it("should encode uint128", () => {

    })

    it("should decode uint128", () => {
        const v0 = UInt128.fromU8a([0x00]);
        expect<string>(v0.toString()).toStrictEqual("0");

        const v1 = UInt128.fromU8a([0xfc]);
        expect<string>(v1.toString()).toStrictEqual("63");

        const v2 = UInt128.fromU8a([0x01, 0x01]);
        expect<string>(v2.toString()).toStrictEqual("64");

        const v3 = UInt128.fromU8a([0xfd, 0xff]);
        expect<string>(v3.toString()).toStrictEqual("16383");

        const v4 = UInt128.fromU8a([0x02, 0x00, 0x01, 0x00]);
        expect<string>(v4.toString()).toStrictEqual("16384");

        const v5 = UInt128.fromU8a([0xfe, 0xff, 0xff, 0xff]);
        expect<string>(v5.toString()).toStrictEqual("1073741823");

        const v6 = UInt128.fromU8a([0x03, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v6.toString()).toStrictEqual("4294967295");

        const v7 = UInt128.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v7.toString()).toStrictEqual("1329227995784915872903807060280344575");

        const v8 = UInt128.fromU8a([ 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff, 0x12]);
        expect<string>(v8.toString()).toStrictEqual("2180");

        const v9 = UInt128.fromU8a([0x03, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        expect<string>(v9.toString()).toStrictEqual("18446744073709551615")
    })

});