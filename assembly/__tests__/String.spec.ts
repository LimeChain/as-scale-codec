import { String } from "../String";

describe("String", () => {

    it("should encode string", () => {
        const str1: string = "a";
        const str1Output: u8[] = [0x04, 0x61];
        const str2: string = "go-pre";
        const str2Output: u8[] = [0x18, string("go-pre")];
        const str3: string = "We love you! We believe in open source as wonderful form of giving.";
        const str3Output: u8[] = [0x0D, 0x01, str3.split('')];
        const str4: string = "We need a longer string to test with. Let's multiple this several times.";
        const str4Output: u8[] = [0xC2, 0x02, 0x01, 0x00, ...str4];
        const str5: string = "Let's test some special ASCII characters: ~  · © ÿ";
        const str5Output: u8[] = [0xDC, ...str5];

        // testString1:= "We love you! We believe in open source as wonderful form of giving."                           // n = 67
        // testString2:= strings.Repeat("We need a longer string to test with. Let's multiple this several times.", 230) // n = 72 * 230 = 16560
        // testString3:= "Let's test some special ASCII characters: ~  · © ÿ"                                           // n = 55 (UTF-8 encoding versus n = 51 with ASCII encoding)
    });
});
