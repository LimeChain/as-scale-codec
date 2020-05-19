import { ScaleString } from "../ScaleString";

describe("String", () => {

    it("should encode string", () => {
        const test1 = new ScaleString("go-pre");
        expect<Array<u8>>(test1.toU8a()).toStrictEqual(append([0x18], "go-pre"));
        expect<i32>(test1.toU8a().length).toStrictEqual(7);

        const str2 = "We love you! We believe in open source as wonderful form of giving.";
        const test2 = new ScaleString(str2);
        expect<Array<u8>>(test2.toU8a()).toStrictEqual(append([0x0D, 0x01], str2));
        expect<i32>(test2.toU8a().length).toStrictEqual(69);

        const str3 = "Let's test some special ASCII characters: ~  · © ÿ";
        const test3 = new ScaleString(str3);
        expect<Array<u8>>(test3.toU8a()).toStrictEqual(append([0xDC], str3));
        expect<i32>(test3.toU8a().length).toStrictEqual(56);

        const str4 = "We need a longer string to test with. Let's multiple this several times.";
        const test4 = new ScaleString(repeatString(str4, 230));
        expect<Array<u8>>(test4.toU8a()).toStrictEqual(append([0xC2, 0x02, 0x01, 0x00], repeatString(str4, 230)));
        expect<i32>(test4.toU8a().length).toStrictEqual(16564);
    });

    it("should decode string", () => {
        expect<Array<u8>>(ScaleString.fromU8a([0x04, 0x61])).toStrictEqual(([0x61]));
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
