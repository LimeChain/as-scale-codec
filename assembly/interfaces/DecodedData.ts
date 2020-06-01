export class DecodedData<T> {
    constructor (public readonly value: T, public readonly decBytes: i32) { }
}