// TODO ComponentType sa pouziva
export interface ComponentType<T> {
    new(...args: any[]): T;
}
