export const enum BIT_LENGTH {
    INT_8 = 1,
    INT_16 = 2,
    INT_32 = 4,
    INT_64 = 8
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
    * @description Copy src elements in dst at provided position. 
    */
    static copy<T> (src: T[], dst: Array<T>, start: i32 = 0): void {
        for (let i = 0; i < dst.length; i++) {
            if (src.length <= i) {
                break;
            }
            dst[start + i] = src[i];
        }
    }

    static encodeInteger (bytesBuffer: u8[], i: i32): i32 {
        if (i < 1 << 6) {
            Bytes.putUint<u8>(bytesBuffer, u8(i) << 2, BIT_LENGTH.INT_8);
            return 1
        }

        if (i < 1 << 14) {
            Bytes.putUint<u16>(bytesBuffer, u16(i << 2) + 1, BIT_LENGTH.INT_16);
            return 2;
        }

        if (i < 1 << 30) {
            Bytes.putUint<u32>(bytesBuffer, u32(i << 2) + 2, BIT_LENGTH.INT_32);
            return 4;
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
}

