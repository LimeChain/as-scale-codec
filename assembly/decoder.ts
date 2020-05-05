export class Decoder {

    // TODO
    // decode (value: u8[]): bool {
    //     trace(value.length.toString());
    //     return this.decodeBool(value);
    // }

    /** Accepts a byte array representing SCALE encoded bool and decodes it and returns the result. Throws error if invalid */
    static decodeBool (value: u8[]): bool {
        if (value.length != 1) {
            throw new Error('cannot decode invalid boolean');
        }
        if (value[0] == 1 || value[0] == 0) {
            return value[0] == 1;
        }
        throw new Error('cannot decode invalid boolean');
    }
}