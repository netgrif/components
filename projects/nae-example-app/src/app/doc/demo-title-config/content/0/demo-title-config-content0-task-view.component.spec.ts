import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoTitleConfigContent0TaskViewComponent } from './demo-title-config-content0-task-view.component';
import {
    MaterialModule,
    ConfigurationService,
    AuthenticationMethodService,
    NAE_TAB_DATA,
    SimpleFilter,
    FilterType
} from 'netgrif-application-engine';
import {
    HeaderComponentModule,
    PanelComponentModule,
} from 'netgrif-components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NaeExampleAppConfigurationService} from '../../../../nae-example-app-configuration.service';

describe('DemoTitleConfigContent0TaskViewComponent', () => {
    let component: DemoTitleConfigContent0TaskViewComponent;
    let fixture: ComponentFixture<DemoTitleConfigContent0TaskViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                HeaderComponentModule,
                PanelComponentModule,
                BrowserAnimationsModule
            ],
            providers: [
                {provide: NAE_TAB_DATA, useValue: {baseFilter: new SimpleFilter('id', FilterType.TASK, {})}},
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}
            ],
            declarations: [DemoTitleConfigContent0TaskViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoTitleConfigContent0TaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
