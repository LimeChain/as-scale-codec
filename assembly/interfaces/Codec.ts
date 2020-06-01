/**
 * @name Codec
 * @description
 * IMPORTANT! Interfaces are not yet supported in AssemblyScript.
 * The interface will be enforced only by the Editor and not the Compiler!
 * The base Codec interface. All supported types by the library must implement this interface.
 * This interface represents the base functions required by every encoding/decoding type
 */
export interface Codec {

    /**
     * @description Encodes the value as a Uint8Array as per the SCALE specification
     */
    toU8a (): u8[]

    /**
     * @description The length of Uint8Array when the value is encoded
     */
    encodedLength (): i32

}