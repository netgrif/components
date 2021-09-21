import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {CaseChangedFields} from './tree-component/model/case-changed-fields';

@Injectable()
export class TreeCaseViewService implements OnDestroy {

    public loadTask$: BehaviorSubject<Case>;
    public reloadCase$: Subject<void>;
    public caseChangedFields$: Subject<CaseChangedFields>;

    constructor() {
        this.loadTask$ = new BehaviorSubject<Case>(undefined);
        this.reloadCase$ = new Subject<void>();
        this.caseChangedFields$ = new Subject<CaseChangedFields>();
    }

    ngOnDestroy(): void {
        this.loadTask$.complete();
        this.reloadCase$.complete();
        this.caseChangedFields$.complete();
    }
}
