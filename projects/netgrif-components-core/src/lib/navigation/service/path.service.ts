import {Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_URI_NODE_CASES_PAGE_SIZE} from '../model/size-menu-injection-token';

/**
 * Service for managing URIs
 */
@Injectable({
    providedIn: 'root',
})
export class PathService {

    public static SEPARATOR: string = '/';
    private readonly _activePath$: BehaviorSubject<string>;
    protected pageSize: number;

    constructor(
        protected _logger: LoggerService,
        @Optional() @Inject(NAE_URI_NODE_CASES_PAGE_SIZE) pageSize: string | number = 20
    ) {
        let finalPageSize: number;

        if (pageSize == null) {
            this._logger.debug('No pageSize provided, defaulting to 20.');
            finalPageSize = 20;
        } else if (typeof pageSize === 'string') {
            const parsed = parseInt(pageSize, 10);
            if (isNaN(parsed)) {
                this._logger.warn('Invalid pageSize string provided, defaulting to 20.', { provided: pageSize });
                finalPageSize = 20;
            } else {
                finalPageSize = parsed;
            }
        } else {
            finalPageSize = pageSize;
        }

        this.pageSize = finalPageSize;
        this._logger.debug('PathService initialized with pageSize', { pageSize: this.pageSize });

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
