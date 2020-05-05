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

    static encodeBool(value: bool): u8[] {
        var bytesEncoded = new Array<u8>(1);
        bytesEncoded[0] = value ? 0x01 : 0x00;
        return bytesEncoded;
    }
}