import { ScaleString } from "../ScaleString";
import { ScaleStringArray } from "../ScaleStringArray";
import { Bytes } from "../utils/Bytes";

describe("Scale String Array", () => {

    it("should encode string array", () => {
        const strArray = new ScaleStringArray(["hello", "world"]);
        expect<Array<u8>>(strArray.toU8a()).toStrictEqual(([0x08, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
    });

    it("should encode long string array", () => {
        const str = "The 1963 Impala featured rectilinear styling with an engine-turned aluminum rear taillight panel surrounded by a chrome border on SS models.";
        const strArray = new ScaleStringArray(["hello", "world", repeatString(str, 500), '™ ± Ã ¿ £ µ']);

        const longStr: Array<u8> = append([0xC2, 0x45, 0x04, 0x00], repeatString(str, 500));
        const asciiStr: Array<u8> = append([0x48], '™ ± Ã ¿ £ µ');

        let expectedResult: Array<u8> = [0x10, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64];
        expectedResult = expectedResult.concat(longStr).concat(asciiStr);

        expect<Array<u8>>(strArray.toU8a()).toStrictEqual(expectedResult);
    });

    it("should decode string array", () => {
        const scaleStrArray = ScaleStringArray.fromU8a([0x08, 0x14, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64]);
        expect<i32>(scaleStrArray.length).toStrictEqual(2);
        expect<string>(scaleStrArray[0]).toStrictEqual("hello");
        expect<string>(scaleStrArray[1]).toStrictEqual("world");
    });

    it("should decode long string array", () => {
        const str = "The 1963 Impala featured rectilinear styling with an engine-turned aluminum rear taillight panel surrounded by a chrome border on SS models.";
        const scaleStr = new ScaleString(repeatString(str, 500));

        const encodedStrArray: Array<u8> = new Array<u8>();
        encodedStrArray.push(0x14);
        Bytes.copy(scaleStr.toU8a(), encodedStrArray, encodedStrArray.length);
        Bytes.copy<u8>([0x14, 0x77, 0x6f, 0x72, 0x6c, 0x64], encodedStrArray, encodedStrArray.length);
        Bytes.copy<u8>([0x38, 0x77, 0x6f, 0x6e, 0x64, 0x65, 0x72, 0x66, 0x75, 0x6c, 0x5f, 0x6c, 0x69, 0x66, 0x65], encodedStrArray, encodedStrArray.length);
        Bytes.copy<u8>([0x48, 0xe2, 0x84, 0xa2, 0x20, 0xc2, 0xb1, 0x20, 0xc3, 0x83, 0x20, 0xc2, 0xbf, 0x20, 0xc2, 0xa3, 0x20, 0xc2, 0xb5], encodedStrArray, encodedStrArray.length)
        Bytes.copy(scaleStr.toU8a(), encodedStrArray, encodedStrArray.length);

        const scaleStrArray = ScaleStringArray.fromU8a(encodedStrArray);
        expect<i32>(scaleStrArray.length).toStrictEqual(5);
        expect<string>(scaleStrArray[0]).toStrictEqual(repeatString(str, 500));
        expect<string>(scaleStrArray[1]).toStrictEqual("world");
        expect<string>(scaleStrArray[2]).toStrictEqual("wonderful_life");
        expect<string>(scaleStrArray[3]).toStrictEqual("™ ± Ã ¿ £ µ");
        expect<string>(scaleStrArray[4]).toStrictEqual(repeatString(str, 500));
    });
});

function append (to: Array<u8>, from: string): Array<u8> {
    const strToBytes: ArrayBuffer = String.UTF8.encode(from);
    const strArray: Uint8Array = Uint8Array.wrap(strToBytes);

    for (let i = 0; i < strArray.length; i++) {
        to.push(strArray[i]);
    }

    return to;
}

function repeatString (str: string, numberOfRepeats: i32): string {
    let result: string = str;
    for (let i = 1; i < numberOfRepeats; i++) {
        result += str;
    }

    return result;
}
