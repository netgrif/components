import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Case} from '../../resources/interface/case';

@Injectable()
export class TreeCaseViewService implements OnDestroy {

    public loadTask$: BehaviorSubject<Case>;
    public reloadCase$: Subject<void>;

    constructor() {
        this.loadTask$ = new BehaviorSubject<Case>(undefined);
        this.reloadCase$ = new Subject<void>();
    }

    ngOnDestroy(): void {
        this.loadTask$.complete();
        this.reloadCase$.complete();
    }
}
