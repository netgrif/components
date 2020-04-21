import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavigationTreeComponent} from './navigation-tree.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {QuickPanelModule} from '../quick-panel/quick-panel.module';
import {UserModule} from '../../user/user.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestConfigurationService} from '../../utility/tests/test-config';

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
                QuickPanelModule,
                UserModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
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
});
