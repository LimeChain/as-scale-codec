export const enum BIT_LENGTH {
    INT_8 = 1,
    INT_16 = 2,
    INT_32 = 4,
    INT_64 = 8
}


export class Bytes {

<<<<<<< HEAD
    static toUint (b: u8[], bytesLength: u32): void {
        // TODO
    }

    static toUint16 (b: u8[]): u16 {
        return u16(b[0]) | u16(b[1]) << 8
    }

    static toUint32 (b: u8[]): u32 {
        return b[0] | u32(b[1]) << 8 | u32(b[2]) << 16 | u32(b[3]) << 24
    }

    static toUint64 (b: u8[]): u64 {
        return u64(b[0]) | u64(b[1]) << 8 | u64(b[2]) << 16 | u64(b[3]) << 24 |
            u64(b[4]) << 32 | u64(b[5]) << 40 | u64(b[6]) << 48 | u64(b[7]) << 56
    }

    static copyFromPosition (input: u8[], out: Array<u8>, position: i32 = 0): void {
        for (let i = 0; i < out.length; i++) {
            if (input.length <= i) {
                break;
            }
            out[position + i] = input[i];
        }
    }
}
=======
    static putUint<T extends number> (b: u8[], v: T, bitLength: number): void {
        b[0] = u8(v);

        for (let i: u8 = 1; i < bitLength; i++) {
            b[i] = u8(v >> i * 8);
        }
    }

    static toUint<T extends number> (b: u8[], bitLength: number): T {
        let result: T = <T>b[0];
        for (let i: u8 = 1; i < bitLength; i++) {
            result |= (b[i] as T) << 8 * i;
        }

        return result;
    }
}
>>>>>>> 6b60df31fe8d87ded6a01890a5575a8333c8646f
