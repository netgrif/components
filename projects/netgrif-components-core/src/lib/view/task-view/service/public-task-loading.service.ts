import {Injectable} from '@angular/core';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PublicTaskLoadingService {

    protected _loading$: LoadingEmitter;

    constructor() {
        this._loading$ = new LoadingEmitter();
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public setLoading$(bool: boolean) {
        this._loading$.next(bool);
    }
}
