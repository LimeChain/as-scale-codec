const fs = require("fs");
const loader = require("@assemblyscript/loader");

const imports = {
    env: {
        abort (_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        }
    }
};
const instance = loader.instantiateSync(fs.readFileSync(__dirname + "/build/example.wasm"), imports).exports;


(async () => {
    console.log('Encode custom string into SCALE format');
    console.log(encodeString('hello_world'));

    console.log('');

    console.log('Decode custom string from SCALE format');
    console.log(decodeString([0x2c, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x5f, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
})();

function encodeString (input) {
    // Allocate memory for the input
    let inputPtr = instance.__retain(instance.__allocString(input));

    // Process 'encodeString' and store the result at pointer
    let fnPtr = instance.encodeString(inputPtr);

    // Get pointer value
    let result = instance.__getArray(fnPtr);

    // Free memory
    instance.__release(inputPtr);
    instance.__release(fnPtr);

    return result;
}

function decodeString (input) {
    // Allocate memory for the input
    // U8Array_ID = id of 'u8[]'
    // ID provides for what type of array memory should be retained
    let inputPtr = instance.__retain(instance.__allocArray(instance.U8Array_ID, input));

    // Process 'decodeString' and store the result at pointer
    let fnPtr = instance.decodeString(inputPtr);

    // Get pointer value
    let result = instance.__getString(fnPtr);

    // Free memory
    instance.__release(inputPtr);
    instance.__release(fnPtr);

    return result;
}
