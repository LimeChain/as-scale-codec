export class Encoder {

    // TODO
    // encode<T>(value: T): u8[] {
    //     trace(nameof(value));
    //     switch (nameof(value)) {
    //         case "bool":
    //             return this.encodeBool(true);
    //         default:
    //             new Error('unsupported type');
    //     }
    //     return [1];
    // }

    /** Encodes a given bool value to Uint8Array as per the SCALE codec specification
     * true -> [1]
     * false -> [0]
     */
    static encodeBool(value: bool): u8[] {
        let bytesEncoded = new Array<u8>(1);
        bytesEncoded[0] = value ? 0x01 : 0x00;
        return bytesEncoded;
    }
}