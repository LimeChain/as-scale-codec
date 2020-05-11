import { Hash } from "../Hash";

describe("Hash", () => {

    // it("should decode hash", () => {
    //     const hash: Hash = Hash.fromU8a([0xff]);
    //     const expected: StaticArray<u8> = [0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

    //     expect<i32>(hash.data.length).toStrictEqual(32);
    //     expect<StaticArray<u8>>(hash.data).toStrictEqual(expected);
    // });

    it("should return hex representation of a  hash", () => {
        const hash: Hash = Hash.fromU8a([0xff]);

        expect<string>(hash.toString()).toStrictEqual('0xff00000000000000000000000000000000000000000000000000000000000000');
    });
});
