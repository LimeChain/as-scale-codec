import {UInt128} from "../UInt128";

describe("BigInt", () => {

    it("should encode uint128", () => {

    })

    it("should decode uint128", () => {
        const v1 = UInt128.fromU8a([0x00, 0x3f]);
        // log(v1.toString());

        const v2 = UInt128.fromU8a([0x01, 0x01]);
        // log(v2.toString());

        const v3 = UInt128.fromU8a([0xfd, 0xff]);
        // log(v3.toString());

        const v4 = UInt128.fromU8a([0x02, 0x00, 0x01, 0x00]);
        // log(v4.toString());

        // const v5 = UInt128.fromU8a([0xfe, 0xff, 0xff, 0xff]);
        // log(v5.toString());

        // const v6 = UInt128.fromU8a([0x03, 0xff, 0xff, 0xff, 0xff]);
        // log(v6.toString());

        const v6 = UInt128.fromU8a([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
        log(v6.toString());

        // const a = UInt128.fromU8a([
        //     0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88,
        //     0x99, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x12
        // ]);
        // log(a.toString());
    })

});