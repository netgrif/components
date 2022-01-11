import {Injectable} from '@angular/core';
import {GroupInterface} from '../../../resources/interface/group';
import {LoadingEmitter} from '../../../utility/loading-emitter';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {Observable, of} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrganizationListService {

    private _groups: Array<GroupInterface>;
    private _loading$: LoadingEmitter;

    constructor(private _resource: UserResourceService, private _log: LoggerService) {
        this._groups = [];
        this._loading$ = new LoadingEmitter();
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get groups(): Array<GroupInterface> {
        return this._groups;
    }

    public get groups$(): Observable<Array<GroupInterface>> {
        return of(this._groups);
    }

    public loadGroups() {
        if (this._loading$.isActive) {
            return;
        }
        this._loading$.on();
        this._resource.getAllGroups().pipe(take(1)).subscribe(groups => {
            if (Array.isArray(groups.groups) && groups.groups.length !== 0) {
                this._groups = groups.groups;
                this._loading$.off();
            } else {
                this._log.info('There are no Groups');
                this._loading$.off();
            }
        }, error => {
            this._log.debug('Getting groups failed', error);
            this._loading$.off();
        });
    }
}
