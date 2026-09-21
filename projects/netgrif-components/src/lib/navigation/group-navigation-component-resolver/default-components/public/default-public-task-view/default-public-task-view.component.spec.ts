import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DefaultPublicTaskViewComponent} from './default-public-task-view.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import {
    AuthenticationMethodService,
    CaseResourceService,
    ConfigurationService,
    FilterType,
    MaterialModule,
    MockCaseResourceService,
    MockPetrinetResourceService,
    MockProcessService,
    MockTaskResourceService,
    NAE_TAB_DATA,
    PetriNetResourceService,
    ProcessService,
    SimpleFilter,
    TaskResourceService,
    TestConfigurationService,
} from '@netgrif/components-core';
import {PanelComponentModule} from "../../../../../panel/panel.module";
import {HeaderComponentModule} from "../../../../../header/header.module";

describe('DefaultPublicTaskViewComponent', () => {
    let component: DefaultPublicTaskViewComponent;
    let fixture: ComponentFixture<DefaultPublicTaskViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HeaderComponentModule,
                PanelComponentModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                {
                    provide: NAE_TAB_DATA,
                    useValue: {baseFilter: new SimpleFilter('id', FilterType.TASK, {}), tabSelected$: new Observable()}
                },
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: ProcessService, useClass: MockProcessService},
                {provide: PetriNetResourceService, useClass: MockPetrinetResourceService},
                {provide: TaskResourceService, useClass: MockTaskResourceService},
                {provide: CaseResourceService, useClass: MockCaseResourceService}
            ],
            declarations: [DefaultPublicTaskViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPublicTaskViewComponent);
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
