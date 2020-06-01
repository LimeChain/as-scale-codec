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

    static appendUint<T extends number> (b: Array<u8>, v: T, bitLength: number): void {
        b.push(u8(v));
        for (let i: u8 = 1; i < bitLength; i ++) {
            b.push(u8(v >> i * 8));
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
     * @description Reverses the sequence of the bytes in the array
     */
    static reverse (bytes: u8[]): void {
        for (let i = bytes.length / 2 - 1; i >= 0; i--) {
            const oppositeIndex = bytes.length - 1 - i;
            const tempByte: u8 = bytes[i];
            bytes[i] = bytes[oppositeIndex];
            bytes[oppositeIndex] = tempByte;
        }
    }
}

