
/**
 * Array Utility functions
 */
export namespace ArrayUtils {

    /**
     * Utility function that checks whether every element is equal between 2 arrays
     * @param a 
     * @param b 
     */
    export function areEqual<T>(a: T, b: T): bool {
        if (a.values.length != b.values.length) {
            return false;
        }

        for (let i = 0; i < a.values.length; i++) {
            if (a.values[i] != b.values[i]) {
                return false;
            }
        }
        return true;
    }

}