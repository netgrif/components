import {InjectionToken} from '@angular/core';

export interface TabPersistenceStorage {
    readonly length: number;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}

export function tabPersistenceSessionStorageFactory(): TabPersistenceStorage | undefined {
    try {
        return typeof sessionStorage === 'undefined' ? undefined : sessionStorage;
    } catch {
        return undefined;
    }
}

export function tabPersistenceLocalStorageFactory(): TabPersistenceStorage | undefined {
    try {
        return typeof localStorage === 'undefined' ? undefined : localStorage;
    } catch {
        return undefined;
    }
}

export const NAE_TAB_PERSISTENCE_STORAGE = new InjectionToken<TabPersistenceStorage | undefined>(
    'NaeTabPersistenceStorage',
    {
        providedIn: 'root',
        factory: tabPersistenceSessionStorageFactory
    }
);
