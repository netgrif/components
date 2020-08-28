import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationTreeComponent} from './navigation-tree.component';
import {CommonModule} from '@angular/common';
import {MaterialModule, ConfigurationService, TestConfigurationService, TranslateLibModule} from '@netgrif/application-engine';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {UserComponentModule} from '../../user/user.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('NavigationTreeComponent', () => {
    let component: NavigationTreeComponent;
    let fixture: ComponentFixture<NavigationTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationTreeComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            imports: [
                CommonModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                TranslateLibModule, NoopAnimationsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
