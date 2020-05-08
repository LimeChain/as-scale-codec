export const enum BIT_LENGTH {
    INT_8 = 1,
    INT_16 = 2,
    INT_32 = 4,
    INT_64 = 8
}

export class Bytes {

    static putUint16(b: u8[], v: u16): void {
        b[0] = u8(v);
        b[1] = u8(v >> 8);
    }

    static putUint32(b: u8[], v: u32): void {
        b[0] = u8(v);
        b[1] = u8(v >> 8);
        b[2] = u8(v >> 16);
        b[3] = u8(v >> 24)
    }

    static putUint64(b: u8[], v: u64): void {
        b[0] = u8(v);
        b[1] = u8(v >> 8);
        b[2] = u8(v >> 16);
        b[3] = u8(v >> 24);
        b[4] = u8(v >> 32);
        b[5] = u8(v >> 40);
        b[6] = u8(v >> 48);
        b[7] = u8(v >> 56)
    }

    static toUint16(b: u8[]): u16 {
        return u16(b[0]) | u16(b[1]) << 8
    }

    static toUint32(b: u8[]): u32 {
        return b[0] | u32(b[1]) << 8 | u32(b[2]) << 16 | u32(b[3]) << 24
    }

    static toUint64(b: u8[]): u64 {
        return u64(b[0]) | u64(b[1]) << 8 | u64(b[2]) << 16 | u64(b[3]) << 24 |
            u64(b[4]) << 32 | u64(b[5]) << 40 | u64(b[6]) << 48 | u64(b[7]) << 56
    }

}