import { UInt8 } from "../UInt/UInt8";
import { UInt16 } from "../UInt/UInt16";

describe("test new codec", () => {
    it("uints", () => {
        const instance = new UInt16();
        instance.populateFromBytes([1, 0]);
        trace(instance.toU8a().toString());
    })
});