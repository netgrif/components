import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TreeCaseViewService {

    public caseId: BehaviorSubject<string>;

    constructor() {
        this.caseId = new BehaviorSubject<string>(undefined);
    }
}
