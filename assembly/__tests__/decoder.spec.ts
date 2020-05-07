import { Decoder } from "../decoder";

describe("Decoder", () => {

    it("should decode bool with true", () => {
        expect<bool>(Decoder.decodeBool([0x01])).toStrictEqual(true);
    });

    it("should decode bool with false", () => {
        expect<bool>(Decoder.decodeBool([0x00])).toStrictEqual(false);
    });

    itThrows('when provided invalid bool byte array', () => {
        Decoder.decodeBool([0x00, 0x01, 0xff]);
    });

    itThrows('when provided invalid bool value', () => {
        Decoder.decodeBool([5]);
    })
});
