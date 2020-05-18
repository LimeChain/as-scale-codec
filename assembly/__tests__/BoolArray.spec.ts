import { BoolArray } from "../BoolArray";

describe("Bool Array", () => {

    it("should encode bool array", () => {
        const boolArray: BoolArray = new BoolArray([true, false, true]);
        expect<Array<u8>>(boolArray.toU8a()).toStrictEqual([0x0c, 0x01, 0x00, 0x01]);
    });

    it("should decode bool array", () => {
        const boolTest1: u8[] = [0x00];
        expect<Array<bool>>(BoolArray.fromU8a(boolTest1)).toStrictEqual([]);

        const boolTest2: u8[] = [0x0c, 0x01, 0x00, 0x01];
        expect<Array<bool>>(BoolArray.fromU8a(boolTest2)).toStrictEqual([true, false, true]);
    });
});
