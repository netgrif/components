export interface ChangeMessageResolver<T> {

    resolve(change: T): string;
}
