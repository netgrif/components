import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultCaseRefListViewComponent} from './default-case-ref-list-view.component';
import {NavigationComponentModule} from '../../../../navigation.module';
import {
    NAE_BASE_FILTER,
    NAE_DATAFIELD_ALLOWED_NETS,
    NAE_DEFAULT_HEADERS,
    NAE_TAB_DATA,
    NAE_VIEW_ID_SEGMENT,
    OverflowService,
    SimpleFilter,
    TestMockDependenciesModule,
    TranslateLibModule
} from '@netgrif/components-core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {of} from 'rxjs';
import {DefaultTabbedTaskViewComponent} from '../../tabbed/default-tabbed-task-view/default-tabbed-task-view.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {FlexLayoutModule, FlexModule} from "@ngbracket/ngx-layout";

describe('DefaultCaseRefListViewComponent', () => {
    let component: DefaultCaseRefListViewComponent;
    let fixture: ComponentFixture<DefaultCaseRefListViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FlexModule,
                FlexLayoutModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([]),
            ],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: NAE_BASE_FILTER,
                    useValue: {filter: SimpleFilter.emptyCaseFilter()}
                },
                {provide: NAE_VIEW_ID_SEGMENT, useValue: 'id'},
                OverflowService,
                {provide: NAE_DEFAULT_HEADERS, useValue: []},
                {provide: NAE_DATAFIELD_ALLOWED_NETS, useValue: []},
                {
                    provide: NAE_TAB_DATA,
                    useValue: {
                        allowedNets: [],
                        tabUniqueId: '1',
                        tabSelected$: of(true),
                        tabClosed$: of(),
                        tabViewOrder: 1,
                        tabViewComponent: DefaultTabbedTaskViewComponent,
                        navigationItemTaskData: []
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultCaseRefListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
