export class NullStorage implements Storage {
    [name: string]: any;

    readonly length: number;

    clear(): void {
        return;
    }

    getItem(key: string): string | null {
        return null;
    }

    key(index: number): string | null {
        return null;
    }

    removeItem(key: string): void {
        return;
    }

    setItem(key: string, value: string): void {
        return;
    }

}
