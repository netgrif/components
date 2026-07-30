import {Inject, Injectable, Optional} from "@angular/core";
import {InjectedTabbedBuilderViewData} from "../injected-builder-data";
import {NAE_TAB_DATA} from "@netgrif/components-core";

@Injectable()
export class LocalStorageService {

    protected _prefix = '';

    constructor(@Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabbedBuilderViewData) {
        this._prefix = injectedTabData?.processCase ? injectedTabData?.processCase?.stringId + '_' : '';
    }

    get prefix(): string {
        return this._prefix;
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(this._prefix + key);
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(this._prefix + key, value);
    }
}
