import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {PublicSingleTaskViewComponent} from './public-single-task-view.component';
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
import {Observable} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('PublicSingleTaskViewComponent', () => {
    let component: PublicSingleTaskViewComponent;
    let fixture: ComponentFixture<PublicSingleTaskViewComponent>;

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
                {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}
            ],
            declarations: [PublicSingleTaskViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublicSingleTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
