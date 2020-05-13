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

    itThrows('when provided invalid bool byte array', () => {
        Bool.fromU8a([0x00, 0x01, 0xff]);
    });

    itThrows('when provided invalid bool value', () => {
        Bool.fromU8a([0x05]);
    })

});
