
/**
 * Array Utility functions
 */
export namespace ArrayUtils {

    /**
     * By given 2 arrays, checks whether their values are equal (strict equal by index)
     */
    export function areArraysEqual<T>(a: Array<T>, b: Array<T>): bool {
        if (a.length != b.length) {
            return false;
        }

        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns new Array<u8> from Uint8 Typed array
     * @param typedArr 
     */
    export function toU8Array(typedArr: Uint8Array): u8[] {
        let res: u8[] = [];
        for (let i = 0; i < typedArr.length; i++) {
            res.push(typedArr[i]);
        }
        return res;
    }
}