import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DefaultTabbedSingleTaskViewComponent} from './default-tabbed-single-task-view.component';
import {HeaderComponentModule} from "../../../../../header/header.module";
import {PanelComponentModule} from "../../../../../panel/panel.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import {
    AuthenticationMethodService,
    ConfigurationService,
    FilterType,
    MaterialModule, NAE_TAB_DATA, SimpleFilter,
    TestConfigurationService
} from "@netgrif/components-core";

describe('DefaultTabbedSingleTaskViewComponent', () => {
    let component: DefaultTabbedSingleTaskViewComponent;
    let fixture: ComponentFixture<DefaultTabbedSingleTaskViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [DefaultTabbedSingleTaskViewComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTabbedSingleTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
