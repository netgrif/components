import {Component, OnInit} from '@angular/core';
import {Case} from 'netgrif-application-engine';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'nae-app-case-panel-example',
    templateUrl: './case-panel-example.component.html',
    styleUrls: ['./case-panel-example.component.scss']
})
export class CasePanelExampleComponent implements OnInit {
    readonly TITLE = 'Case panel';
    readonly DESCRIPTION = 'Ukážka použitia case panelu...';
    case_: Case;
    featuredFields$: BehaviorSubject<Array<string>>;

    constructor() {
        this.case_ = {
            lastModified: null,
            visualId: null,
            petriNetObjectId: null,
            processIdentifier: null,
            title: 'Case title',
            icon: 'nature',
            immediateData: [
                {stringId: 'a', title: '', type: '', value: 5},
                {stringId: 'b', title: '', type: '', value: 'Text'}
            ],
            color: 'purple',
            creationDate: null,
            author: null,
            resetArcTokens: null,
            stringId: null,
            petriNetId: null
        };
        this.featuredFields$ = new BehaviorSubject<Array<string>>(['a', 'b']);
    }

    ngOnInit(): void {
    }

}
