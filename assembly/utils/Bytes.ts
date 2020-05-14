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

    static toUint<T extends number>(b: u8[], bitLength: i32): T {
        const buf = new Array<u8>(bitLength);
        Bytes.copyToPosition(b, buf);

        let result: T = <T>buf[0];
        for (let i: i32 = 1; i < bitLength; i++) {
            result |= (buf[i] as T) << 8 * u8(i);
        }

        return result;
    }

    static copyFromPosition(src: u8[], dst: Array<u8>, position: i32 = 0): void {
        for (let i = 0; i < dst.length; i++) {
            if (src.length <= i) {
                break;
            }
            dst[i] = src[position + i];
        }
    }

    static copyToPosition(src: u8[], dst: Array<u8>, position: i32 = 0): void {
        for (let i = 0; i < dst.length; i++) {
            if (src.length <= i) {
                break;
            }
            dst[position + i] = src[i];
        }
    }

    static decodeInt(input: u8[]): i64 {
        const result = Bytes.decodeUint(input);
        return i64(result);
    }

    static decodeUint(input: u8[]): u64 {
        const mode = input[0] & 3;
        if (mode <= 2) {
            return u64(Bytes.decodeSmallInt(input, mode));
        }

        const topSixBits = input[0] >> 2;
        const byteLen = u8(topSixBits) + 4;

        const buf = new Array<u8>(byteLen);
        Bytes.copyToPosition(input, buf);

        if (byteLen == 4) {
            return u64(Bytes.toUint<u32>(buf, BIT_LENGTH.INT_32));
        }

        if (byteLen > 4 && byteLen < 8) {
            const tmp = new Array<u8>(8);
            Bytes.copyToPosition(buf, tmp);
            return Bytes.toUint<i64>(tmp, BIT_LENGTH.INT_64);
        }

        throw new Error('Invalid integer');
    }

    static decodeSmallInt(input: u8[], mode: u8): i64 {
        if (mode == 0) {
            return Bytes.decodeByte(input[0]);
        }

        if (mode == 1) {
            return Bytes.decode2Bytes([input[0], input[1]]);
        }

        if (mode == 2) {
            return Bytes.decode3Bytes([input[0], input[1], input[2], input[3]]);
        }

        throw new Error("Small int: mode does not exists");
    }

    static decodeByte(byte: u8): i64 {
        return i64(byte >> 2);
    }

    static decode2Bytes(bytes: u8[]): i64 {
        return i64(Bytes.toUint<u16>(bytes, BIT_LENGTH.INT_16) >> 2)
    }

    static decode3Bytes(bytes: u8[]): i64 {
        return i64(Bytes.toUint<u32>(bytes, BIT_LENGTH.INT_32) >> 2);
    }
}

