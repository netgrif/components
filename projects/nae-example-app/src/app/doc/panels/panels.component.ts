import {Component, OnInit} from '@angular/core';
import {
    Case,
    HeaderColumn,
    HeaderColumnType,
    PetriNetReference,
    WorkflowMetaField,
    Author,
    AllowedNetsServiceFactory,
    SimpleFilter,
    CaseViewService,
    AllowedNetsService,
    SearchService,
    NAE_BASE_FILTER,
    WorkflowViewService
} from '@netgrif/components-core';
import {BehaviorSubject} from 'rxjs';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = () => {
    return {
        filter: SimpleFilter.emptyCaseFilter()
    };
};

@Component({
    selector: 'nae-app-panels',
    templateUrl: './panels.component.html',
    styleUrls: ['./panels.component.scss'],
    providers: [
        CaseViewService,
        WorkflowViewService,
        SearchService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
    ]
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
            color: 'purple',
            creationDate: [2020, 4, 6, 13, 37],
            author: {
                email: 'example@example.com',
                fullName: 'Net Grif',
            },
            immediateData: [
                {
                    stringId: 'enum_status',
                    title: 'Enum value',
                    type: 'enumeration',
                    value: {defaultValue: 'Approved', translations: {}},
                    component: {
                        name: 'value',
                        properties: {
                            'Approved-background': '#bde3fb',
                            'Approved-color': '#0790FF',
                        }
                    }
                },
                {
                    stringId: 'icon_status',
                    title: 'Icon',
                    type: 'enumeration',
                    value: {defaultValue: 'Approval', translations: {}},
                    component: {
                        name: 'icon',
                        optionIcons: [
                            {key: 'Preparation', type: 'material', value: 'schedule'},
                            {key: 'Approved', type: 'material', value: 'check_circle'},
                            {key: 'Approval', type: 'material', value: 'verified'}
                        ]
                    }
                }
            ],
            resetArcTokens: null,
            stringId: null,
            petriNetId: null,
            permissions: {},
            actors: {}
        };
        this.workflow = {
            stringId: 'ID',
            title: 'Workflow title',
            identifier: 'NET',
            uriNodeId: 'NET',
            version: '1.0.0',
            initials: 'NET',
            defaultCaseName: 'Nepoviem',
            createdDate: [2020, 5, 9, 10, 0],
            author: {
                email: 'test@netgrif.com',
                fullName: 'Test Testovič'
            },
            immediateData: []
        };
        this.featuredFields$ = new BehaviorSubject<Array<HeaderColumn>>([
            new HeaderColumn(HeaderColumnType.META, 'visualId', 'Visual ID', 'text'),
            new HeaderColumn(HeaderColumnType.META, 'title', 'Title', 'text'),
            new HeaderColumn(HeaderColumnType.IMMEDIATE, 'enum_status', 'Enum value', 'enumeration', true, 'net'),
            new HeaderColumn(HeaderColumnType.IMMEDIATE, 'icon_status', 'Icon', 'enumeration', true, 'net'),
            new HeaderColumn(HeaderColumnType.META, 'author', 'Author', 'text'),
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
