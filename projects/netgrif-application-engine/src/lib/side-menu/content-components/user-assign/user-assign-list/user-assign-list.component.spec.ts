import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserAssignListComponent} from './user-assign-list.component';
import {UserAssignItemComponent} from './user-assign-item/user-assign-item.component';
import {MaterialModule} from '../../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {Component} from '@angular/core';
import {CovalentCommonModule} from '@covalent/core/common';
import {TranslateLibModule} from '../../../../translate/translate-lib.module';
import StringUtil from '../../../../utility/string/string-util';
import {FormControl} from '@angular/forms';
import {UserAssignInjectedData} from '../model/user-assign-injected-data';
import {UserAssignService} from '../service/user-assign.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../../utility/tests/test-config';
import {ErrorSnackBarComponent} from '../../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';

describe('UserAssignListComponent', () => {
    let component: UserAssignListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                BrowserAnimationsModule,
                CovalentCommonModule,
                HttpClientTestingModule,
                TranslateLibModule
            ],
            providers: [
                StringUtil,
                UserAssignService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                UserAssignListComponent,
                UserAssignItemComponent,
                ErrorSnackBarComponent,
                TestWrapperComponent
            ]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [
                        ErrorSnackBarComponent
                    ]
                }
            })
            .compileComponents();

        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-user-assign-list [searchUserControl]="formControl" [injectedData]="injectedData"></nae-user-assign-list>'
})
class TestWrapperComponent {
    injectedData = {roles: [], value: new UserValue('5', 'admin', 'netgrif', 'super@netgrif.com')} as UserAssignInjectedData;
    formControl = new FormControl();
}
