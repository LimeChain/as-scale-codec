import { ByteReader } from '../utils/ByteReader';
import { Hash, Bool } from '../index';
import { UInt32, UInt16, UInt64, UInt8 } from '../UInt';
import { Int8, Int16, Int32, Int64 } from '../Int';
import { ScaleString } from '../ScaleString';

describe("ByteReader", () => {
    it("decodes single type", () => {
        const buffer = new ByteReader([0], 0);
        assert(buffer.readBool() == new Bool(false), "Not correctly decoded");
    })
    it("decodes two types", () => {
        const buffer = new ByteReader([1, 69, 0, 0, 0], 0);
        expect<Bool>(buffer.readBool()).toStrictEqual(new Bool(true));
        expect<UInt32>(buffer.readUInt32()).toStrictEqual(new UInt32(69));
    })
    it("decodes many types", () => {
        const u32Bytes: u8[] = [12, 0, 0, 0];
        const hashBytes: u8[] = [128, 1, 10, 0, 0, 0, 2, 2, 1, 123, 33, 3, 1, 35, 34, 5, 8, 22, 52, 1, 0, 0, 0, 1, 1, 1, 56, 21, 142, 13, 13, 1];
        const scaleStringBytes: u8[] = [16, 110, 105, 99, 101];
        const buffer = new ByteReader(
            u32Bytes.concat(hashBytes).concat([1]).concat(scaleStringBytes), 
            0
        );
        expect<UInt32>(buffer.readUInt32()).toStrictEqual(new UInt32(12));
        expect<Hash>(buffer.readHash()).toStrictEqual(new Hash(hashBytes));
        expect<Bool>(buffer.readBool()).toStrictEqual(new Bool(true));
        expect<ScaleString>(buffer.readScaleString()).toStrictEqual(new ScaleString("nice"));
    })
    it("decodes from custom curPos value", () => {
        const bytes: u8[] = [0, 0, 0, 69, 0, 0, 0, 0, 0, 0, 0, 12, 12];
        const buffer = new ByteReader(bytes, 3);
        assert(buffer.readUInt32() == new UInt32(69), "Could not read UInt32 correctly");
    })

    it("decodes list of unsigned integers", () => {
        const bytes: u8[] = [1, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 4, 0, 223];
        const buffer = new ByteReader(bytes, 0);
        expect<UInt64>(buffer.readUInt64()).toStrictEqual(new UInt64(1));
        expect<UInt32>(buffer.readUInt32()).toStrictEqual(new UInt32(69));
        expect<UInt16>(buffer.readUInt16()).toStrictEqual(new UInt16(4));
        expect<UInt8>(buffer.readUInt8()).toStrictEqual(new UInt8(223));        
    })

    it("decodes list of signed integers", () => {
        const bytes: u8[] = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xdd, 0xfe, 0xff, 0xf1];
        const buffer = new ByteReader(bytes, 0);
        expect<Int64>(buffer.readInt64()).toStrictEqual(new Int64(-1));
        expect<Int32>(buffer.readInt32()).toStrictEqual(new Int32(-570425345));
        expect<Int16>(buffer.readInt16()).toStrictEqual(new Int16(-2));
        expect<Int8>(buffer.readInt8()).toStrictEqual(new Int8(-15));  
    })

    it("decodes scaleString correctly", () => {
        const bytes: u8[] = [8, 97, 115, 20, 115, 99, 97, 108, 101, 20, 99, 111, 100, 101, 99];
        const buffer = new ByteReader(bytes, 0);
        expect<ScaleString>(buffer.readScaleString()).toStrictEqual(new ScaleString("as"));
        expect<ScaleString>(buffer.readScaleString()).toStrictEqual(new ScaleString("scale"));
        expect<ScaleString>(buffer.readScaleString()).toStrictEqual(new ScaleString("codec"));
    })
})