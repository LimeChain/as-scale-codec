export class Bytes {

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