import { Encoder } from "../encoder";

describe("Encoder", () => {

    it("should encode bool with true", () => {
        expect<u8[]>(Encoder.encodeBool(true)).toStrictEqual([0x01]);
    });

    it("should encode bool with false", () => {
        expect<u8[]>(Encoder.encodeBool(false)).toStrictEqual([0x00]);
    });

});
