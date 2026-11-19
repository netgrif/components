import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationRailComponent} from './navigation-rail.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {QuickPanelComponentModule} from '../quick-panel/quick-panel.module';
import {UserComponentModule} from '../../user/user.module';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('NavigationRailComponent', () => {
    let component: NavigationRailComponent;
    let fixture: ComponentFixture<NavigationRailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NavigationRailComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                QuickPanelComponentModule,
                UserComponentModule,
                TranslateLibModule
            ],
            providers: [
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationRailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
