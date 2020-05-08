export type BYTE_LENGTH = 8 | 16 | 32 | 64;

export class Bytes {

    static toUint(b: u8[], bytesLength: u32) {
        // TODO
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