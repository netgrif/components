import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DefaultPublicSingleTaskViewComponent} from './default-public-single-task-view.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import {AuthenticationMethodService,
    ConfigurationService, FilterType, MaterialModule, NAE_TAB_DATA, SimpleFilter, TestConfigurationService } from '@netgrif/components-core';
import {HeaderComponentModule} from "../../../../../header/header.module";
import {PanelComponentModule} from "../../../../../panel/panel.module";

describe('DefaultPublicSingleTaskViewComponent', () => {
    let component: DefaultPublicSingleTaskViewComponent;
    let fixture: ComponentFixture<DefaultPublicSingleTaskViewComponent>;

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
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [DefaultPublicSingleTaskViewComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPublicSingleTaskViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
