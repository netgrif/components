import { Component, OnInit } from '@angular/core';
import {Case, HeaderColumn, HeaderColumnType, PetriNetReference} from '@netgrif/application-engine';
import {BehaviorSubject} from 'rxjs';
import {WorkflowMetaField} from '../../../../../netgrif-application-engine/src/lib/header/workflow-header/workflow-header.service';
import {Author} from '../../../../../netgrif-application-engine/src/lib/resources/interface/author';
import {ImmediateData} from '../../../../../netgrif-application-engine/src/lib/resources/interface/immediate-data';

@Component({
  selector: 'nae-app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})
export class PanelsComponent implements OnInit {
    readonly TITLE = 'Case panel';
    readonly DESCRIPTION = 'Ukážka použitia case panelu...';
    case_: Case;
    workflow: PetriNetReference;
    featuredFields$: BehaviorSubject<Array<HeaderColumn>>;
    workflowFields$: BehaviorSubject<Array<HeaderColumn>>;

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
        this.workflow = {
            stringId: 'ID',
            title: 'Workflow title',
            identifier: 'NET',
            version: '1.0.0',
            initials: 'NET',
            defaultCaseName: 'Nepoviem',
            createdDate: [2020, 5, 9, 10, 0],
            author: {
                email: 'kovar@netgrif.com',
                fullName: 'Jakub Kovář'
            },
            immediateData: []
        };
        this.featuredFields$ = new BehaviorSubject<Array<HeaderColumn>>([
            new HeaderColumn(HeaderColumnType.META, 'visualId', 'Visual ID', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'titleSortable', 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'author', 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'creationDate', 'Creation date', 'text'),
        ]);
        this.workflowFields$ = new BehaviorSubject<Array<HeaderColumn>>([
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.INITIALS, 'Initials', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.TITLE, 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.VERSION, 'Version', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.AUTHOR, 'Author', 'text'),
            new HeaderColumn(HeaderColumnType.META, WorkflowMetaField.CREATION_DATE, 'Upload date', 'date'),
        ]);
    }

    ngOnInit(): void {
    }
}
