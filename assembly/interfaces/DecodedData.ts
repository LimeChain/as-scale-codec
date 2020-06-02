/**
 * @name DecodedData
 * @description
 * DecodedData is used in Scale arrays as a standard output
 * each element should return after decoding
 * @param
 * value - Decoded value
 * decBytes - Number of decoded bytes
 */

export class DecodedData<T> {
    constructor (public readonly value: T, public readonly decBytes: i32) { }
}