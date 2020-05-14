import { Hash } from "../Hash";

describe("Hash", () => {

    it("should encode hash", () => {
        const hash: Hash = Hash.fromU8a([0xff]);
        expect<Array<u8>>(hash.toU8a()).toStrictEqual([0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    });

    it("should decode hash", () => {
        const hash: Hash = Hash.fromU8a([0xff]);
        const expected: Array<u8> = [0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

        expect<i32>(hash.length).toStrictEqual(32);
        expect<Array<u8>>(hash).toStrictEqual(expected);
    });

    it("should convert bytes to hash", () => {
        const hash: Hash = Hash.bytesToHash([0xff]);

        expect<i32>(hash.length).toStrictEqual(32);
        expect<Array<u8>>(hash).toStrictEqual([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]);
    });

    it("should return hex representation of a  hash", () => {
        const hash: Hash = Hash.fromU8a([0xff]);
        expect<string>(hash.toString()).toStrictEqual('0x2550000000000000000000000000000000');
    });
});