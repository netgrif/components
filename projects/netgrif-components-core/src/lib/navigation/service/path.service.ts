import {Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActiveGroupService} from '../../groups/services/active-group.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_URI_NODE_CASES_PAGE_SIZE} from '../model/size-menu-injection-token';

/**
 * Service for managing URIs
 * */
@Injectable({
    providedIn: 'root',
})
export class PathService {

    public static SEPARATOR: string = '/';
    private readonly _activePath$: BehaviorSubject<string>;

    constructor(protected _logger: LoggerService,
                protected _activeGroupService: ActiveGroupService,
                @Optional() @Inject(NAE_URI_NODE_CASES_PAGE_SIZE) protected pageSize: string | number) {
        if (!pageSize) {
            this.pageSize = 20;
        }
        if (typeof this.pageSize === 'string') {
            this.pageSize = parseInt(this.pageSize);
        }
        this._activePath$ = new BehaviorSubject<string>(PathService.SEPARATOR);
    }

    public set activePath(path: string) {
        this._activePath$.next(path);
    }

    public get activePath$(): Observable<string> {
        return this._activePath$;
    }

    public get activePath(): string {
        return this._activePath$.getValue();
    }

    public reset(): string {
        this.activePath = PathService.SEPARATOR;
        return PathService.SEPARATOR;
    }

    public splitPath(path: string): Array<string> {
        return path.split(PathService.SEPARATOR);
    }
}
