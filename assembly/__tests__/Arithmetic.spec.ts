import { u128 } from "as-bignum";
import { Int16, Int32, Int64, Int8 } from "../Int";
import { UInt128, UInt16, UInt32, UInt64, UInt8 } from "../UInt"

describe("Arithmetic operators", () => {
    it("should add", () => {
        // Tests for In8
        expect<Int8>(new Int8(1) + new Int8(126)).toStrictEqual(new Int8(1 + 126));
        expect<Int8>(new Int8(101) + new Int8(-31)).toStrictEqual(new Int8(101 - 31));
        
        // Tests for Int16
        expect<Int16>(new Int16(121) + new Int16(-212)).toStrictEqual(new Int16(121 - 212));
        expect<Int16>(new Int16(131) + new Int16(983)).toStrictEqual(new Int16(131 + 983));
        
        // Tests for Int32
        expect<Int32>(new Int32(10) + new Int32(-3123131)).toStrictEqual(new Int32(10 - 3123131));
        expect<Int32>(new Int32(31231333) + new Int32(112)).toStrictEqual(new Int32(31231333 + 112));
        
        // Tests for Int64
        expect<Int64>(new Int64(10) + new Int64(-64324214312)).toStrictEqual(new Int64(10 - 64324214312));
        expect<Int64>(new Int64(1247182641823) + new Int64(12431241231)).toStrictEqual(new Int64(1247182641823 + 12431241231));
        
        //Tests for UInt8
        expect<UInt8>(new UInt8(101) + new UInt8(31)).toStrictEqual(new UInt8(101 + 31));
        expect<UInt8>(new UInt8(123) + new UInt8(21)).toStrictEqual(new UInt8(123 + 21));
        
        // Tests for Int16
        expect<UInt16>(new UInt16(1131) + new UInt16(983)).toStrictEqual(new UInt16(1131 + 983));
        expect<UInt16>(new UInt16(32767) + new UInt16(112)).toStrictEqual(new UInt16(32767 + 112));
        
        // Tests for Int32
        expect<UInt32>(new UInt32(1311231) + new UInt32(756123)).toStrictEqual(new UInt32(1311231 + 756123));
        expect<UInt32>(new UInt32(31231333) + new UInt32(112)).toStrictEqual(new UInt32(31231333 + 112));
        
        // Tests for Int64
        expect<UInt64>(new UInt64(8412413131) + new UInt64(83718237)).toStrictEqual(new UInt64(8412413131 + 83718237));
        expect<UInt64>(new UInt64(1247182641823) + new UInt64(12431241231)).toStrictEqual(new UInt64(1247182641823 + 12431241231));
    })
    it("should substract", () => {
        // Tests for In8
        expect<Int8>(new Int8(1) - new Int8(127)).toStrictEqual(new Int8(1 - 127));
        expect<Int8>(new Int8(101) - new Int8(-31)).toStrictEqual(new Int8(101 + 31));
        expect<Int8>(new Int8(123) - new Int8(21)).toStrictEqual(new Int8(123 - 21));
        
        // Tests for Int16
        expect<Int16>(new Int16(121) - new Int16(-212)).toStrictEqual(new Int16(121 + 212));
        expect<Int16>(new Int16(131) - new Int16(983)).toStrictEqual(new Int16(131 - 983));
        expect<Int16>(new Int16(32767) - new Int16(112)).toStrictEqual(new Int16(32767 - 112));
        
        // Tests for Int32
        expect<Int32>(new Int32(10) - new Int32(-3123131)).toStrictEqual(new Int32(10 + 3123131));
        expect<Int32>(new Int32(131) - new Int32(756123)).toStrictEqual(new Int32(131 - 756123));
        expect<Int32>(new Int32(31231333) - new Int32(112)).toStrictEqual(new Int32(31231333 - 112));
        
        // Tests for Int64
        expect<Int64>(new Int64(10) - new Int64(-64324214312)).toStrictEqual(new Int64(10 + 64324214312));
        expect<Int64>(new Int64(131) - new Int64(756123)).toStrictEqual(new Int64(131 - 756123));
        expect<Int64>(new Int64(1247182641823) - new Int64(12431241231)).toStrictEqual(new Int64(1247182641823 - 12431241231));
        
        //Tests for UInt8
        expect<UInt8>(new UInt8(255) - new UInt8(127)).toStrictEqual(new UInt8(255 - 127));
        expect<UInt8>(new UInt8(101) - new UInt8(31)).toStrictEqual(new UInt8(101 - 31));
        expect<UInt8>(new UInt8(123) - new UInt8(21)).toStrictEqual(new UInt8(123 - 21));
        
        // Tests for Int16
        expect<UInt16>(new UInt16(1131) - new UInt16(983)).toStrictEqual(new UInt16(1131 - 983));
        expect<UInt16>(new UInt16(32767) - new UInt16(112)).toStrictEqual(new UInt16(32767 - 112));
        
        // Tests for Int32
        expect<UInt32>(new UInt32(1311231) - new UInt32(756123)).toStrictEqual(new UInt32(1311231 - 756123));
        expect<UInt32>(new UInt32(31231333) - new UInt32(112)).toStrictEqual(new UInt32(31231333 - 112));
        
        // Tests for Int64
        expect<UInt64>(new UInt64(8412413131) - new UInt64(83718237)).toStrictEqual(new UInt64(8412413131 - 83718237));
        expect<UInt64>(new UInt64(1247182641823) - new UInt64(12431241231)).toStrictEqual(new UInt64(1247182641823 - 12431241231));
    
        expect<UInt128>(new UInt128(u128.fromString("12313412984213")) - new UInt128(u128.fromString("83718237"))).toStrictEqual(new UInt128(u128.sub(u128.fromString("12313412984213"), u128.fromString("83718237"))));
    })

    throws("should throw on out of range UInt8", () => {
        const _res = new UInt8(10) - new UInt8(12);
    })
    throws("should throw on out of range UInt16", () => {
        const _res = new UInt16(1231) - new UInt16(12311);
    })
    throws("should throw on out of range UInt32", () => {
        const _res = new UInt32(8478123) - new UInt32(9178311);
    })
    throws("should throw on out of range UInt64", () => {
        const _res = new UInt64(874123771183) - new UInt64(894123771183);
    })
})