export const enum BIT_LENGTH {
    INT_8 = 1,
    INT_16 = 2,
    INT_32 = 4,
    INT_64 = 8
}

class DecodedData {
    constructor(public encBytes: i32, public length: u64) { }
}

export class Bytes {

    static putUint<T extends number> (b: u8[], v: T, bitLength: number): void {
        b[0] = u8(v);

        for (let i: u8 = 1; i < bitLength; i++) {
            b[i] = u8(v >> i * 8);
        }
    }

    static toUint<T extends number> (b: u8[], bitLength: i32): T {
        const buf = new Array<u8>(bitLength);
        Bytes.copy<u8>(b, buf);

        let result: T = <T>buf[0];
        for (let i: i32 = 1; i < bitLength; i++) {
            result |= (buf[i] as T) << 8 * u8(i);
        }

        return result;
    }

    /**
    * @description Copy u8[] src elements in u8[] dst at provided position. 
    */
    static copy<T> (src: T[], dst: Array<T>, start: i32 = 0): void {
        for (let i = 0; i < dst.length; i++) {
            if (src.length <= i) {
                break;
            }
            dst[start + i] = src[i];
        }
    }

    /**
    * @description Copy u8[] src elements in Uint8Array dst at provided position. 
    */
    static copyToTyped (src: u8[], dst: Uint8Array, start: i32 = 0): void {
        for (let i = 0; i < dst.length; i++) {
            if (src.length <= i) {
                break;
            }
            dst[start + i] = src[i];
        }
    }

    static appendUint<T extends number> (b: Array<u8>, v: T, bitLength: number): void {
        b.push(u8(v));
        for (let i: u8 = 1; i < bitLength; i++) {
            b.push(u8(v >> i * 8));
        }
    }

    static encodeInteger (bytesBuffer: u8[], i: i32): i32 {
        if (i < 1 << 6) {
            Bytes.putUint<u8>(bytesBuffer, u8(i) << 2, BIT_LENGTH.INT_8);
            return BIT_LENGTH.INT_8
        }

        if (i < 1 << 14) {
            Bytes.putUint<u16>(bytesBuffer, u16(i << 2) + 1, BIT_LENGTH.INT_16);
            return BIT_LENGTH.INT_16;
        }

        if (i < 1 << 30) {
            Bytes.putUint<u32>(bytesBuffer, u32(i << 2) + 2, BIT_LENGTH.INT_32);
            return BIT_LENGTH.INT_32;
        }

        const o = new Array<u8>(8);
        let m = i;

        let numBytes = 0;
        for (; numBytes < 256 && m != 0; numBytes++) {
            m = m >> 8;
        }

        const topSixBits: u8 = u8(numBytes - 4);
        const lengthByte: u8 = topSixBits << 2 + 3;

        Bytes.putUint<u8>(bytesBuffer, lengthByte, BIT_LENGTH.INT_8);
        Bytes.putUint<u64>(o, i64(i), BIT_LENGTH.INT_64);

        Bytes.copy<u8>(o.slice(0, numBytes), bytesBuffer, 1);

        return numBytes + 1;
    }

    static decodeData (input: u8[]): DecodedData {
        if (input.length == 0) {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error('Invalid input: Byte array should not be empty');
        }

        const mode = input[0] & 3;
        if (i32(mode) <= BIT_LENGTH.INT_16) {
            return Bytes.decodeSmallInt(input, mode);
        }

        const topSixBits = input[0] >> 2;
        const byteLen = u8(topSixBits) + 4;

        const buf = new Array<u8>(byteLen);
        Bytes.copy<u8>(input, buf);

        if (i32(byteLen) == BIT_LENGTH.INT_32) {
            return new DecodedData(BIT_LENGTH.INT_32, u64(Bytes.toUint<u32>(buf, BIT_LENGTH.INT_32)));
        }

        if (i32(byteLen) > BIT_LENGTH.INT_32 && i32(byteLen) < BIT_LENGTH.INT_64) {
            const tmp = new Array<u8>(8);
            Bytes.copy<u8>(buf, tmp);
            return new DecodedData(BIT_LENGTH.INT_64, Bytes.toUint<i64>(tmp, BIT_LENGTH.INT_64));
        }

        // Todo: Refactor as exception handling is not recommended
        // Return null for errors
        throw new Error('Invalid integer');
    }

    static decodeUint (input: u8[]): u64 {
        if (input.length == 0) {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error('Invalid input: Byte array should not be empty');
        }

        const mode = input[0] & 3;
        if (i32(mode) <= BIT_LENGTH.INT_16) {
            return u64(Bytes.decodeSmallInt(input, mode).length);
        }

        const topSixBits = input[0] >> 2;
        const byteLen = u8(topSixBits) + 4;

        const buf = new Array<u8>(byteLen);
        Bytes.copy<u8>(input, buf);

        if (i32(byteLen) == BIT_LENGTH.INT_32) {
            return u64(Bytes.toUint<u32>(buf, BIT_LENGTH.INT_32));
        }

        if (i32(byteLen) > BIT_LENGTH.INT_32 && i32(byteLen) < BIT_LENGTH.INT_64) {
            const tmp = new Array<u8>(8);
            Bytes.copy<u8>(buf, tmp);
            return Bytes.toUint<i64>(tmp, BIT_LENGTH.INT_64);
        }

        // Todo: Refactor as exception handling is not recommended
        // Return null for errors
        throw new Error('Invalid integer');
    }

    static decodeSmallInt (input: u8[], mode: u8): DecodedData {
        if (mode == 0) {
            return new DecodedData(BIT_LENGTH.INT_8, u64(Bytes.decodeByte(input[0])));
            // return Bytes.decodeByte(input[0]);
        }

        if (mode == 1) {
            if (i32(input.length) < BIT_LENGTH.INT_16) {
                // Todo: Refactor as exception handling is not recommended
                // Return null for errors
                throw new Error('Invalid input: expected 2 bytes array');
            }
            return new DecodedData(BIT_LENGTH.INT_16, u64(Bytes.decode2Bytes([input[0], input[1]])));
        }

        if (mode == 2) {
            if (i32(input.length) < BIT_LENGTH.INT_32) {
                // Todo: Refactor as exception handling is not recommended
                // Return null for errors
                throw new Error('Invalid input: expected 4 bytes array');
            }
            return new DecodedData(BIT_LENGTH.INT_32, u64(Bytes.decode4Bytes([input[0], input[1], input[2], input[3]])));
        }

        // Todo: Refactor as exception handling is not recommended
        // Return null for errors
        throw new Error("Small int: mode is invalid");
    }

    static decodeByte (byte: u8): i64 {
        return i64(byte >> 2);
    }

    static decode2Bytes (bytes: u8[]): i64 {
        return i64(Bytes.toUint<u16>(bytes, BIT_LENGTH.INT_16) >> 2)
    }

    static decode4Bytes (bytes: u8[]): i64 {
        return i64(Bytes.toUint<u32>(bytes, BIT_LENGTH.INT_32) >> 2);
    }
}