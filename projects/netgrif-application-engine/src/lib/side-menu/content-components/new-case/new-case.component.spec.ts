import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCaseComponent} from './new-case.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {of} from 'rxjs';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';

describe('NewCaseComponent', () => {
    let component: NewCaseComponent;
    let fixture: ComponentFixture<NewCaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                SnackBarModule
            ],
            declarations: [NewCaseComponent],
            providers: [
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(undefined, undefined, () => of('close'), [])
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCaseComponent);
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
