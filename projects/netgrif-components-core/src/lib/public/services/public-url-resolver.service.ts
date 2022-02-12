import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PublicUrlResolverService {

    protected _url: string;
    constructor() {
    }

    set url(url: string) {
        this._url = url;
    }

    get url() {
        return this._url;
    }
}
