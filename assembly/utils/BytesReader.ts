import {BIT_LENGTH, Bytes} from "./Bytes";

export class BytesReader {

    readonly bytes: u8[];
    public readBytes: i32 = 0;

    constructor(bytes: u8[]) {
        this.bytes = bytes;
    }

    decodeUint(): i64 {
        if (this.bytes.length == 0) {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error('Invalid input: Byte array should not be empty');
        }

        const mode = this.bytes[this.readBytes] & 3;
        if (i32(mode) <= BIT_LENGTH.INT_16) {
            return u64(this.decodeSmallInt(mode));
        }

        const topSixBits = this.bytes[this.readBytes] >> 2;
        const byteLen = u8(topSixBits) + 4;

        const buf = new Array<u8>(byteLen);
        Bytes.copy<u8>(this.bytes, buf);

        if (i32(byteLen) == BIT_LENGTH.INT_32) {
            this.readBytes += BIT_LENGTH.INT_32;
            return u64(Bytes.toUint<u32>(buf, BIT_LENGTH.INT_32));
        }

        if (i32(byteLen) > BIT_LENGTH.INT_32 && i32(byteLen) < BIT_LENGTH.INT_64) {
            this.readBytes += BIT_LENGTH.INT_64;
            const tmp = new Array<u8>(8);
            Bytes.copy<u8>(buf, tmp);
            return Bytes.toUint<i64>(tmp, BIT_LENGTH.INT_64);
        }

        // Todo: Refactor as exception handling is not recommended
        // Return null for errors
        throw new Error('Invalid integer');
    }

    decodeBigInt(): u64[] {
        if (this.bytes.length == 0) {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error('Invalid input: Byte array should not be empty');
        }

        const mode = this.bytes[this.readBytes] & 0x03;
        if (i32(mode) <= BIT_LENGTH.INT_16) {
            return [u64(this.decodeSmallInt(mode)), 0];
        }
        const topSixBits = this.bytes[0] >> 2;
        const byteLen = u8(topSixBits) + 4;
        const valueLE = this.bytes.slice(1);
        // @ts-ignore
        const buffer = valueLE.dataStart;
        const lo = load<u64>(buffer, 0);
        const hi = load<u64>(buffer, 1 * sizeof<u64>());
        return [lo, hi];
    }

    private decodeSmallInt (mode: u8): i64 {
        let result: i64;
        if (mode == 0) {
            result = Bytes.decodeByte(this.bytes[this.readBytes]);
            this.readBytes++;
        } else if (mode == 1) {
            if (i32(this.bytes.length) < BIT_LENGTH.INT_16) {
                // Todo: Refactor as exception handling is not recommended
                // Return null for errors
                throw new Error('Invalid input: expected 2 bytes array');
            }
            result = Bytes.decode2Bytes([this.bytes[this.readBytes], this.bytes[this.readBytes + 1]]);
            this.readBytes+= 2;
        } else if (mode == 2) {
            if (i32(this.bytes.length) < BIT_LENGTH.INT_32) {
                // Todo: Refactor as exception handling is not recommended
                // Return null for errors
                throw new Error('Invalid input: expected 4 bytes array');
            }
            result = Bytes.decode4Bytes([this.bytes[this.readBytes], this.bytes[this.readBytes + 1], this.bytes[this.readBytes + 2], this.bytes[this.readBytes + 3]]);
            this.readBytes += 4;
        } else {
            // Todo: Refactor as exception handling is not recommended
            // Return null for errors
            throw new Error("Small int: mode is invalid");
        }
        return result;
    }
}