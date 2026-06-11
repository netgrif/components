import {Injectable, OnDestroy} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export abstract class AbstractMasterDetailService<T> implements OnDestroy {
    protected _selected: BehaviorSubject<T>;
    protected _create: Subject<T>;
    protected _delete: Subject<T>;

    protected constructor() {
        this._selected = new BehaviorSubject<T>(undefined);
        this._create = new Subject<T>();
        this._delete = new Subject<T>();
    }

    public select(data: T): void {
        this._selected.next(data);
    }

    public getSelected(): T {
        return this._selected.value;
    }

    public getSelected$(): Observable<T> {
        return this._selected.asObservable();
    }

    public getCreateEvent$(): Observable<T> {
        return this._create.asObservable();
    }

    public getDeleteEvent$(): Observable<T> {
        return this._delete.asObservable();
    }

    public abstract get allData();
    public abstract create(): T;
    public abstract delete(item: T);
    public abstract duplicate(item: T): T;
    public abstract getAllDataSorted(event: Sort);
    public abstract getSortFromLocalStorage(): Sort;
    public abstract setSortToLocalStorage(sort: Sort);

    ngOnDestroy(): void {
        this._selected.complete();
    }

    public compare(a: string, b: string, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
