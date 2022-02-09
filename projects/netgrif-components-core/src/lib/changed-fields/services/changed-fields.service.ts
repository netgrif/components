import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {ChangedFieldsMap} from '../../event/services/interfaces/changed-fields-map';

@Injectable()
export class ChangedFieldsService implements OnDestroy {

    protected _changedFields$: Subject<ChangedFieldsMap>;

    ngOnDestroy(): void {
        this._changedFields$.complete();
    }

    constructor() {
        this._changedFields$ = new Subject<ChangedFieldsMap>();
    }

    get changedFields$(): Observable<ChangedFieldsMap> {
        return this._changedFields$.asObservable();
    }

    public emitChangedFields(changedFields: ChangedFieldsMap): void {
        if (changedFields === undefined || Object.keys(changedFields).length === 0) {
            return;
        }
        this._changedFields$.next(changedFields);
    }

    public parseChangedFieldsByCaseAndTaskIds(caseId: string, taskIds: Array<string>,
                                              changedFieldsMap: ChangedFieldsMap): Array<ChangedFields> {
        const changedFields: Array<ChangedFields> = [];
        const filteredTaskIds: Array<string> = Object.keys(changedFieldsMap[caseId]).filter(taskId => taskIds.includes(taskId));
        filteredTaskIds.forEach(taskId => {
            changedFields.push(changedFieldsMap[caseId][taskId]);
        });
        return changedFields;
    }
}
