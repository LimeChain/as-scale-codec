import { IntArray } from "../IntArray";

describe("IntArray", () => {

    it("should encode int array", () => {

    });

    it("should decode int array", () => {
        const dataInput: Array<Array<u8>> = [
            // [0x04, 0x04], // Expected output: [1]
            // [0x10, 0x04, 0x08, 0x0c, 0x10] // Expected output: [1, 2, 3, 4]
            [0x10, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10]
        ];

        const expectedOutput: Array<Array<i64>> = [
            // [1],
            // [1, 2, 3, 4]
            [16384, 2, 3, 4]
        ];

        for (let i = 0; i < dataInput.length; i++) {
            const result = IntArray.fromU8a(dataInput[i]);
            log(result.toString());
            expect<Array<i64>>(result).toStrictEqual(expectedOutput[i]);
        }
    });

    it("should return hex representation of int array", () => {
    });
});

