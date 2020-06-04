import { DecodedData } from "./../interfaces/DecodedData";

export const enum BIT_LENGTH {
    INT_8 = 1,
    INT_16 = 2,
    INT_32 = 4,
    INT_64 = 8,
    INT_128 = 16
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

    static appendUint<T extends number> (b: Array<u8>, v: T, bitLength: number): void {
        b.push(u8(v));
        for (let i: u8 = 1; i < bitLength; i++) {
            b.push(u8(v >> i * 8));
        }
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


    // Decode compact int from u8[] input
    static decodeCompactInt (input: u8[]): DecodedData<u64> {
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
            return new DecodedData<u64>(u64(Bytes.toUint<u32>(buf, BIT_LENGTH.INT_32)), BIT_LENGTH.INT_32);
        }

        if (i32(byteLen) > BIT_LENGTH.INT_32 && i32(byteLen) < BIT_LENGTH.INT_64) {
            const tmp = new Array<u8>(8);
            Bytes.copy<u8>(buf, tmp);
            return new DecodedData<u64>(Bytes.toUint<i64>(tmp, BIT_LENGTH.INT_64), BIT_LENGTH.INT_64);
        }

        // Todo: Refactor as exception handling is not recommended
        // Return null for errors
        throw new Error('Invalid integer');
    }

    static decodeSmallInt (input: u8[], mode: u8): DecodedData<u64> {
        if (mode == 0) {
            return new DecodedData<u64>(u64(Bytes.decodeByte(input[0])), BIT_LENGTH.INT_8);
        }

        if (mode == 1) {
            if (i32(input.length) < BIT_LENGTH.INT_16) {
                // Todo: Refactor as exception handling is not recommended
                // Return null for errors
                throw new Error('Invalid input: expected 2 bytes array');
            }
            return new DecodedData<u64>(u64(Bytes.decode2Bytes([input[0], input[1]])), BIT_LENGTH.INT_16);
        }

        if (mode == 2) {
            if (i32(input.length) < BIT_LENGTH.INT_32) {
                // Todo: Refactor as exception handling is not recommended
                // Return null for errors
                throw new Error('Invalid input: expected 4 bytes array');
            }
            return new DecodedData<u64>(u64(Bytes.decode4Bytes([input[0], input[1], input[2], input[3]])), BIT_LENGTH.INT_32);
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

    /**
     * Removes the last ZERO bytes of an Array
     * @param bytes
     */
    static trimEmptyBytes (bytes: u8[]): void {
        for (let i = bytes.length - 1; i > 0; i --) {
            if (bytes[i] === 0) {
                bytes.pop();
            } else {
                break;
            }
        }
    }

    /**
     * Appends Empty Bytes to the provided bytes array
     * @param bytes - the array of bytes to which it will add empty bytes
     * @param targetLength - number of empty bytes to add
     */
    static appendZeroBytes(bytes: u8[], targetLength: i32): void {
        assert(targetLength >= bytes.length, "invalid padding provided");
        const numberOfZeros = targetLength - bytes.length;
        for (let i = 0; i < numberOfZeros; i++) {
            bytes.push(0);
        }
    }
}

