import {Component, OnInit} from '@angular/core';
import {Case, HeaderColumn, HeaderColumnType} from '@netgrif/application-engine';
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
    featuredFields$: BehaviorSubject<Array<HeaderColumn>>;

    constructor() {
        this.case_ = {
            lastModified: null,
            visualId: 'ABC-123456789',
            petriNetObjectId: null,
            processIdentifier: 'net',
            title: 'Case title',
            icon: 'nature',
            immediateData: [],
            color: 'purple',
            creationDate: [2020, 4, 6, 13, 37],
            author: {
                email: 'example@example.com',
                fullName: 'Net Grif',
            },
            resetArcTokens: null,
            stringId: null,
            petriNetId: null
        };
        this.featuredFields$ = new BehaviorSubject<Array<HeaderColumn>>([
            new HeaderColumn(HeaderColumnType.META, 'visualId', 'Visual ID', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'titleSortable', 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'author', 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'creationDate', 'Creation date', 'text'),
        ]);
    }

    ngOnInit(): void {
    }

}
