import {Inject, Injectable} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {PersistedTabViewState} from '../interfaces';
import {NAE_TAB_PERSISTENCE_STORAGE, TabPersistenceStorage} from './tab-persistence-storage';

@Injectable({
    providedIn: 'root'
})
export class TabPersistenceService {

    public static readonly STATE_VERSION = 1;
    public static readonly STORAGE_PREFIX = 'netgrif.tab-view.v1.';
    public static readonly MAX_TABS_PER_VIEW = 100;

    constructor(private _logger: LoggerService,
                @Inject(NAE_TAB_PERSISTENCE_STORAGE) private _storage: TabPersistenceStorage | undefined) {
        this.removeDefaultStates();
    }

    public load(key: string): PersistedTabViewState | undefined {
        if (!this._storage || !key) {
            return undefined;
        }
        try {
            const serialized = this._storage.getItem(this.storageKey(key));
            if (!serialized) {
                return undefined;
            }
            const state = JSON.parse(serialized) as PersistedTabViewState;
            if (!this.isValid(state)) {
                this._storage.removeItem(this.storageKey(key));
                return undefined;
            }
            return state;
        } catch (error) {
            this._logger.warn(`Tab state '${key}' could not be loaded`, error);
            this.remove(key);
            return undefined;
        }
    }

    public save(key: string, state: PersistedTabViewState): void {
        if (!this._storage || !key) {
            return;
        }
        try {
            if (!this.isValid(state)) {
                this._logger.warn(`Tab state '${key}' is invalid and could not be saved`);
                return;
            }
            if (this.isDefaultState(state)) {
                this._storage.removeItem(this.storageKey(key));
                return;
            }
            this._storage.setItem(this.storageKey(key), JSON.stringify(state));
        } catch (error) {
            this._logger.warn(`Tab state '${key}' could not be saved`, error);
        }
    }

    public remove(key: string): void {
        if (!this._storage || !key) {
            return;
        }
        try {
            this._storage.removeItem(this.storageKey(key));
        } catch (error) {
            this._logger.warn(`Tab state '${key}' could not be removed`, error);
        }
    }

    public clear(): void {
        if (!this._storage) {
            return;
        }
        try {
            const keys = Array.from({length: this._storage.length}, (_, index) => this._storage.key(index))
                .filter(key => key?.startsWith(TabPersistenceService.STORAGE_PREFIX));
            keys.forEach(key => this._storage.removeItem(key));
        } catch (error) {
            this._logger.warn('Tab states could not be cleared', error);
        }
    }

    private storageKey(key: string): string {
        return `${TabPersistenceService.STORAGE_PREFIX}${encodeURIComponent(`${this.applicationScope()}|${key}`)}`;
    }

    private applicationStoragePrefix(): string {
        return `${TabPersistenceService.STORAGE_PREFIX}${encodeURIComponent(`${this.applicationScope()}|`)}`;
    }

    private applicationScope(): string {
        try {
            return typeof document === 'undefined' ? '' : document.baseURI;
        } catch {
            return '';
        }
    }

    private isValid(state: PersistedTabViewState): boolean {
        const ids = state?.tabs?.map(tab => tab?.persistence?.id) ?? [];
        return !!state
            && state.version === TabPersistenceService.STATE_VERSION
            && Array.isArray(state.tabs)
            && state.tabs.length <= TabPersistenceService.MAX_TABS_PER_VIEW
            && state.tabs.every(tab => !!tab?.persistence?.id && !!tab.persistence.type)
            && new Set(ids).size === ids.length;
    }

    private isDefaultState(state: PersistedTabViewState): boolean {
        const defaultSelectedTabId = state.tabs[0]?.persistence?.id;
        return state.tabs.every(tab => tab.initial && !tab.pinned)
            && (!state.selectedTabId || state.selectedTabId === defaultSelectedTabId);
    }

    private removeDefaultStates(): void {
        if (!this._storage) {
            return;
        }
        try {
            const keys = Array.from({length: this._storage.length}, (_, index) => this._storage.key(index))
                .filter(key => key?.startsWith(this.applicationStoragePrefix()));
            keys.forEach(key => {
                try {
                    const serialized = this._storage.getItem(key);
                    const state = serialized ? JSON.parse(serialized) as PersistedTabViewState : undefined;
                    if (state && this.isValid(state) && this.isDefaultState(state)) {
                        this._storage.removeItem(key);
                    }
                } catch {
                    return;
                }
            });
        } catch (error) {
            this._logger.warn('Default tab states could not be removed', error);
        }
    }
}
