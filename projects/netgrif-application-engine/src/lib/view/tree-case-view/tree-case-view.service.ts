import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Case} from '../../resources/interface/case';

@Injectable({
    providedIn: 'root'
})
export class TreeCaseViewService {

    public caseId: BehaviorSubject<Case>;

    constructor() {
        this.caseId = new BehaviorSubject<Case>(undefined);
    }
}
