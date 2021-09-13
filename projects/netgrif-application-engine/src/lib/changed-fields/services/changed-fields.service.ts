import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {ChangedFieldsMap} from '../../event/services/event.service';
import {ChangedFields} from '../../data-fields/models/changed-fields';
import {Task} from '../../resources/interface/task';

@Injectable()
export class ChangedFieldsService implements OnDestroy {

    protected _changedFields$: Subject<ChangedFieldsMap>;

    ngOnDestroy(): void {
        this._changedFields$.complete();
    }

    constructor() {
        this._changedFields$ = new Subject<ChangedFieldsMap>();
    }

    get changedFields$(): Subject<ChangedFieldsMap> {
        return this._changedFields$;
    }

    public emitChangedFields(changedFields: ChangedFieldsMap): void {
        if (changedFields === undefined || Object.keys(changedFields).length === 0) {
            return;
        }
        this._changedFields$.next(changedFields);
    }

    public parseChangedFieldsByTask(task: Task, changedFieldsMap: ChangedFieldsMap): ChangedFields | undefined {
        if (!!changedFieldsMap[task.caseId] && !!changedFieldsMap[task.caseId][task.stringId]) {
            return changedFieldsMap[task.caseId][task.stringId];
        }
        return undefined;
    }
}
