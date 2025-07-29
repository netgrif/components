import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultTaskViewComponent} from './default-task-view.component';
import {
    MockProcessService,
    NAE_BASE_FILTER,
    NAE_VIEW_ID_SEGMENT,
    ProcessService,
    SimpleFilter,
    TestMockDependenciesModule
} from "@netgrif/components-core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationComponentModule} from "../../../../navigation.module";
import {RouterTestingModule} from "@angular/router/testing";

describe('DefaultTaskViewComponent', () => {
    let component: DefaultTaskViewComponent;
    let fixture: ComponentFixture<DefaultTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultTaskViewComponent],
            imports: [
                NavigationComponentModule,
                TestMockDependenciesModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {
                    provide: NAE_BASE_FILTER,
                    useValue: {filter: SimpleFilter.emptyTaskFilter()}
                },
                {
                    provide: NAE_VIEW_ID_SEGMENT,
                    useValue: 'test-task-view'
                },
                {provide: ProcessService, useClass: MockProcessService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
