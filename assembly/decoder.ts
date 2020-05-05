export class Decoder {

    // TODO
    // decode (value: u8[]): bool {
    //     trace(value.length.toString());
    //     return this.decodeBool(value);
    // }

    static decodeBool (value: u8[]): bool {
        if (value.length != 1) {
            throw new Error('cannot decode invalid boolean');
        }

        if (value[0] == 1) {
            return true;
        } else if (value[0] === 0) {
            return false;
        }
        throw new Error('cannot decode invalid boolean');
    }
}