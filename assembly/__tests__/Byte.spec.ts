import { Byte } from "../Byte";

describe("Byte", () => {

    it("should encode byte", () => {
        let v = new Byte(0xac);
        expect<u8[]>(v.toU8a()).toStrictEqual([0xac]);
    });

    it("should decode byte", () => {
        expect<Byte>(Byte.fromU8a([0x1f])).toStrictEqual(new Byte(0x1f));
    });
});
