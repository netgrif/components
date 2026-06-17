import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PublicTaskViewComponent} from './public-task-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs';
import {NaeExampleAppConfigurationService} from '../../nae-example-app-configuration.service';
import {
    AuthenticationMethodService,
    ConfigurationService,
    FilterType,
    MaterialModule, MockPetrinetResourceService, MockProcessService,
    NAE_TAB_DATA, PetriNetResourceService,
    ProcessService,
    SimpleFilter, TaskResourceService
} from '@netgrif/components-core';
import {HeaderComponentModule, PanelComponentModule,} from '@netgrif/components';
import {RouterTestingModule} from "@angular/router/testing";
import {
    MockTaskResourceService
} from "../../../../../netgrif-components-core/src/lib/utility/tests/mocks/mock-task-resource.service";

describe('PublicTaskViewComponent', () => {
    let component: PublicTaskViewComponent;
    let fixture: ComponentFixture<PublicTaskViewComponent>;

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
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
                {provide: ProcessService, useClass: MockProcessService},
                {provide: PetriNetResourceService, useClass: MockPetrinetResourceService},
                {provide: TaskResourceService, useClass: MockTaskResourceService}
            ],
            declarations: [PublicTaskViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
