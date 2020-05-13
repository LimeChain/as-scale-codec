import { Codec } from "./Codec";

class BytesArray extends Array<u8> implements Codec {

    static fromU8a (input: u8[]): BytesArray {
        const length = decodeInteger(input);
        // length, err:= sd.DecodeInteger()

        const bytes = new Array<u8>(length);

        // b:= make([]byte, length)
        _, err = sd.Reader.Read(b)

        return bytes;
    }

}

const decodeInteger = function (input: u8[]) {
    const byte = input[0];


    // check mode of encoding, stored at 2 least significant bits
    // const mode = byte & 3;
    // if (mode <= 2) {
    //     val, e := sd.decodeSmallInt(b, mode)
    //     return uint64(val), e
    // }

    // >4 byte mode
    const topSixBits = byte >> 2;
    const byteLen = uint(topSixBits) + 4;

    const buf = new Array<u8>(byteLen);
    // buf:= make([]byte, byteLen)
    // _, err = sd.Reader.Read(buf)

    if (byteLen == 4) {
        o = uint64(binary.LittleEndian.Uint32(buf))
    } else if (byteLen > 4 && byteLen < 8) {
        tmp:= make([]byte, 8)
        copy(tmp, buf)
        o = binary.LittleEndian.Uint64(tmp)
    } else {
        throw new Error('could not decode invalid integer');
    }

    return o;
}