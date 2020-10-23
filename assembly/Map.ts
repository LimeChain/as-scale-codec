import { CompactInt } from ".";
import { BytesReader } from "./BytesReader";
import { Codec } from "./interfaces/Codec";


export class ScaleMap<K extends Codec, V extends Codec> implements Codec{
    /**
     * Map value of ScaleMap
     */
    public readonly value: Map<K, V>;
    
    constructor(){
        this.value = new Map<K, V>();
    }
    
    /**
     * Check if ScaleMap has given key
     * @param key 
     */
    has(key: K): bool{
        return this.value.has(key);
    }
    /**
     * Get the value of given key
     * @param key 
     */
    get(key: K): V{
        return this.value.get(key);
    }
    /**
     * Set this value to the given key
     * @param key 
     * @param value 
     */
    set(key: K, value: V): void{
        this.value.set(key, value);
    }
    /**
     * Delete the given key with its value from the ScaleMap
     * @param key 
     */
    delete(key: K): void{
        this.value.delete(key);
    }
    /**
     * Get array of keys of the ScaleMap
     */
    keys(): K[]{
        return this.value.keys();
    }
    /**
     * Get array of values of the ScaleMap
     */
    values(): V[]{
        return this.value.values();
    }
    /**
     * The number of bytes this Map has
     */
    encodedLength(): i32{
        return this.toU8a().length;
    }
    /**
     * Convert ScaleMap to u8[]
     * Length is encoded first, followed by all key and value encodings concatenated 
     */
    toU8a(): u8[]{
        let result: u8[] = [];
        let keys: K[] = this.value.keys();
        let lenData: CompactInt = new CompactInt(keys.length);
        result = result.concat(lenData.toU8a());
        for(let i = 0; i < keys.length; i++){
            result = result
            .concat(keys[i].toU8a())
            .concat(this.value.get(keys[i]).toU8a());
        }
        return result;
    }

    static fromU8a<K extends Codec, V extends Codec>(input: u8[]): ScaleMap<K, V>{
        const scaleMap = new ScaleMap<K, V>();
        const bytesReader = new BytesReader(input);
        const size = bytesReader.readCompactInt();
        input = bytesReader.getLeftoverBytes();
        const KeyType = instantiate<K>();
        const ValueType = instantiate<V>();

        for(let i: i32 = 0; i<size.value; i++){
            const key = KeyType.fromU8a(input);
            input = input.slice(key.encodedLength());
            const value = ValueType.fromU8a(input);
            input = input.slice(value.encodedLength());
            scaleMap.set(key, value);
        }
        return scaleMap;
    }
}