export interface Transformer<T, R> {
    transform(obj: T): R;
}
