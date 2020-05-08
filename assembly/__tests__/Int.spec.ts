import { Int8 } from "../Int8";
import { Int16 } from "../Int16";
import { Int32 } from "../Int32";

describe("Int", () => {

    it("test", () => {
        expect<Int8>(Int8.fromU8a([0x2a])).toStrictEqual(new Int8(42));
    })

    it("test 2", () => {
        expect<Int16>(Int16.fromU8a([0xff, 0x3f])).toStrictEqual(new Int16(16383));
    })

    it("test 3", () => {
        expect<Int32>(Int32.fromU8a([0xff, 0xff, 0xff, 0x3f])).toStrictEqual(new Int32(1073741823));
        expect<Int32>(Int32.fromU8a([0x00, 0x00, 0x00, 0x40])).toStrictEqual(new Int32(1073741824));
    })

});
