import { ByteArray } from "../ByteArray";

describe("ByteArray", () => {

    it("should decode bytes array", () => {
        const TEST_DATA_VAL: Array<Array<u8>> = [
            [0x04, 0x01],
            [0x04, 0xff],
            [0x08, 0x01, 0x01],
            [0xc, 0x01, 0x01, 0x1],
            [0x28, 0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e],
            appendEmptyBytesTo([0x01, 0x01], 64),
            appendEmptyBytesTo([0xfd, 0xff], 16383),
            appendEmptyBytesTo([0x02, 0x00, 0x01, 0x00], 16384)
        ];

        const TEST_DATA_OUT: Array<Array<u8>> = [
            [0x01],
            [0xff],
            [0x01, 0x01],
            [0x01, 0x01, 0x1],
            [0x42, 0x15, 0x50, 0x1c, 0x37, 0x7e, 0xd8, 0x66, 0x98, 0x2e],
            appendEmptyBytesTo([], 64),
            appendEmptyBytesTo([], 16383),
            appendEmptyBytesTo([], 16384)
        ];

        for (let i = 0; i < TEST_DATA_VAL.length; i++) {
            const byteArray = ByteArray.fromU8a(TEST_DATA_VAL[i]);
            expect<Array<u8>>(byteArray).toStrictEqual(TEST_DATA_OUT[i]);
        }

    });
});

function appendEmptyBytesTo (arr: u8[], bytesToAppend: i32): u8[] {
    for (let i = 0; i < bytesToAppend; i++) {
        arr.push(0xff);
    }

    return arr;
}

