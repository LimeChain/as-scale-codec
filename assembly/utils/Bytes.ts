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

    static toUint<T extends number> (b: u8[], bitLength: number): T {
        let result: T = <T>b[0];
        for (let i: u8 = 1; i < bitLength; i++) {
            result |= (b[i] as T) << 8 * i;
        }

        return result;
    }
}
