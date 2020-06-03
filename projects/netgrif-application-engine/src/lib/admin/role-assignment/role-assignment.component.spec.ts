import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoleAssignmentComponent} from './role-assignment.component';
import {MaterialModule} from '../../material/material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RoleAssignmentService} from './services/role-assignment.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';

describe('RoleAssignmentComponent', () => {
    let component: RoleAssignmentComponent;
    let fixture: ComponentFixture<RoleAssignmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoleAssignmentComponent],
            imports: [
                NoopAnimationsModule,
                HttpClientTestingModule,
                MaterialModule,
                TranslateLibModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                RoleAssignmentService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleAssignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
