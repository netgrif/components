import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_URI_NODE_CASES_PAGE_SIZE} from '../model/size-menu-injection-token';
import {DataGroup} from "../../resources/interface/data-groups";
import {HttpErrorResponse} from "@angular/common/http";

/**
 * Service for managing URIs
 */
@Injectable({
    providedIn: 'root',
})
export class PathService implements OnDestroy {

    public static SEPARATOR: string = '/';
    private readonly _activePath$: BehaviorSubject<string>;
    protected pageSize: number;
    private readonly _datafieldsForMenuResolver$: ReplaySubject<Array<DataGroup>>;

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
        this._datafieldsForMenuResolver$ = new ReplaySubject<Array<DataGroup>>();
    }

    public set activePath(path: string) {
        this._activePath$.next(path);
    }

    public get activePath$(): Observable<string> {
        return this._activePath$.asObservable();
    }

    public get activePath(): string {
        return this._activePath$.getValue();
    }

    public set datafieldsForMenuResolver(data: Array<DataGroup>) {
        if (!this._datafieldsForMenuResolver$.closed) {
            this._datafieldsForMenuResolver$.next(data);
            this._datafieldsForMenuResolver$.complete();
        } else {
            this._logger.error('PathService can have datafields for Menu resolver set only once');
        }
    }

    public set datafieldsForMenuResolverError(error: Error) {
        if (!this._datafieldsForMenuResolver$.closed) {
            this._datafieldsForMenuResolver$.error(error instanceof HttpErrorResponse ? error.error.message : error.message);
            this._datafieldsForMenuResolver$.complete();
        } else {
            this._logger.error('PathService can\'t handle error for datafields for Menu resolver, because stream is already closed');
        }
    }

    public get datafieldsForMenuResolver(): Observable<Array<DataGroup>> {
        return this._datafieldsForMenuResolver$.asObservable();
    }

    get isMenuResolverClosed(): boolean {
        return this._datafieldsForMenuResolver$.closed;
    }

    public reset(): string {
        this.activePath = PathService.SEPARATOR;
        return PathService.SEPARATOR;
    }

    public splitPath(path: string): Array<string> {
        return path.split(PathService.SEPARATOR);
    }

    ngOnDestroy() {
        this._activePath$.complete();
        if (!this._datafieldsForMenuResolver$.closed) {
            this._datafieldsForMenuResolver$.complete();
        }
    }
}
