import { u128 } from "as-bignum";
import { UInt128Array } from "../../Arrays/UInt128Array";

describe("UInt128Array", () => {

    it("should encode uint128 array", () => {
        const dataInput: Array<Array<u128>> = [
            [u128.One],
            [u128.fromString('54321')],
            [u128.fromU32(20001), u128.fromU32(123456)],
            [
                u128.fromU32(1), u128.fromU64(123456789), u128.fromString('123456789012345'), 
                u128.fromString('12345678901234567890'), u128.fromString('1234567890123456789012345')
            ],
            [u128.fromU64(18446744073709551615), u128.fromU64(18446744073709551615), u128.Max],
            [u128.Max - u128.fromU64(u64.MAX_VALUE)]
        ];

        const expectedOutput: Array<Array<u8>> = [
            [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: [1]
            [4, 49, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: 54321
            [8, 33, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 226, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: [20001, 123456]
            [
                20, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 205, 91, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                121, 223, 13, 134, 72, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210, 10, 31, 235, 140, 169, 84, 171, 0, 0, 0, 0, 0, 0, 0, 0,
                121, 223, 226, 61, 68, 166, 54, 15, 110, 5, 1, 0, 0, 0, 0, 0
            ],
            [
                12, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0,
                255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
            ],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255]
        ];

        for (let i = 0; i < dataInput.length; i++) {
            const intArray = new UInt128Array(dataInput[i]);
            expect<Array<u8>>(intArray.toU8a()).toStrictEqual(expectedOutput[i]);
        }
    });

    it("should decode uint128 array", () => {
        const dataInput: Array<Array<u8>> = [
            [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: [1]
            [4, 49, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: 54321
            [8, 33, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 226, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: [20001, 123456]
            [
                20, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 205, 91, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                121, 223, 13, 134, 72, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210, 10, 31, 235, 140, 169, 84, 171, 0, 0, 0, 0, 0, 0, 0, 0,
                121, 223, 226, 61, 68, 166, 54, 15, 110, 5, 1, 0, 0, 0, 0, 0
            ],
            [
                12, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0,
                255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
            ],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255]
        ];

        const expectedOutput: Array<Array<u128>> = [
            [u128.One],
            [u128.fromString('54321')],
            [u128.fromU32(20001), u128.fromU32(123456)],
            [
                u128.fromU32(1), u128.fromU64(123456789), u128.fromString('123456789012345'), 
                u128.fromString('12345678901234567890'), u128.fromString('1234567890123456789012345')
            ],
            [u128.fromU64(18446744073709551615), u128.fromU64(18446744073709551615), u128.Max],
            [u128.Max - u128.fromU64(u64.MAX_VALUE)]
        ];

        for (let i = 0; i < dataInput.length; i++) {
            const result = UInt128Array.fromU8a(dataInput[i]);
            expect<UInt128Array>(result).toStrictEqual(new UInt128Array(expectedOutput[i]));
        }
    });

    it("should decode uint128 array with populate method", () => {
        const dataInput: Array<Array<u8>> = [
            [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: [1]
            [4, 49, 212, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: 54321
            [8, 33, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 226, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Expected output: [20001, 123456]
            [
                20, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 205, 91, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                121, 223, 13, 134, 72, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 210, 10, 31, 235, 140, 169, 84, 171, 0, 0, 0, 0, 0, 0, 0, 0,
                121, 223, 226, 61, 68, 166, 54, 15, 110, 5, 1, 0, 0, 0, 0, 0
            ],
            [
                12, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0,
                255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
            ],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255]
        ];
        const expectedOutput: Array<Array<u128>> = [
            [u128.One],
            [u128.fromString('54321')],
            [u128.fromU32(20001), u128.fromU32(123456)],
            [
                u128.fromU32(1), u128.fromU64(123456789), u128.fromString('123456789012345'), 
                u128.fromString('12345678901234567890'), u128.fromString('1234567890123456789012345')
            ],
            [u128.fromU64(18446744073709551615), u128.fromU64(18446744073709551615), u128.Max],
            [u128.Max - u128.fromU64(u64.MAX_VALUE)]
        ];

        for(let i = 0; i < dataInput.length; i++){
            const instance = new UInt128Array();
            instance.populateFromBytes(dataInput[i]);
            expect<UInt128Array>(instance).toStrictEqual(new UInt128Array(expectedOutput[i]));
        }
    })

    itThrows("should throw on incorrect encoding", () => {
        const invalidEncodedArray1: u8[] = [0x4, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10];
        UInt128Array.fromU8a(invalidEncodedArray1);

        const invalidEncodedArray2: u8[] = [0x13, 0x02, 0x00, 0x01, 0x00, 0x08, 0x0c, 0x10];
        UInt128Array.fromU8a(invalidEncodedArray2);
    });
});

