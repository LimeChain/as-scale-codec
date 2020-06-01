/**
 * @name DecodedLength
 * @description
 * DecodedLength is used as a standard output returned on Uint decoding
 * @param
 * bytes - Number of bytes uint has been fit
 * length - Decoded Uint value
 */

export class DecodedLength {
    constructor (public readonly bytes: i32, public readonly length: u64) { }
}