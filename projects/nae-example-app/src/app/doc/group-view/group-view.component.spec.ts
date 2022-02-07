import {waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupViewComponent } from './group-view.component';
import {
    MaterialModule,
    ConfigurationService,
    AuthenticationMethodService,
    NAE_TAB_DATA,
    SimpleFilter,
    FilterType
} from '@netgrif/components-core';
import {
    HeaderComponentModule,
    PanelComponentModule,
} from '@netgrif/components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NaeExampleAppConfigurationService} from '../../nae-example-app-configuration.service';

describe('GroupViewGroupViewComponent', () => {
    let component: GroupViewComponent;
    let fixture: ComponentFixture<GroupViewComponent>;

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
            declarations: [GroupViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
