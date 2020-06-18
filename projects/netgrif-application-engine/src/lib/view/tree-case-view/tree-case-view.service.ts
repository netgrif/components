import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Case} from '../../resources/interface/case';

@Injectable({
    providedIn: 'root'
})
export class TreeCaseViewService {

    public case: BehaviorSubject<Case>;

    constructor() {
        this.case = new BehaviorSubject<Case>(undefined);
    }
}
