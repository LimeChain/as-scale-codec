import { BytesReader } from "../BytesReader";
import { Int32 } from "../Int";
import { ScaleMap } from "../Map"
import { UInt16, UInt32 } from "../UInt"

describe("ScaleMap", () => {
    it("instantiates new ScaleMap", () => {
        const map = new ScaleMap<UInt32, UInt16>();
        map.set(new UInt32(1), new UInt16(2));
        trace(map.toU8a().toString());
        const newMap = ScaleMap.fromU8Array<UInt32, UInt16>([4, 1, 0, 0, 0, 2, 0]);
        trace(newMap.toU8a().toString());
    })
})