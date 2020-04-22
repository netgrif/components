import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowViewComponent} from './workflow-view.component';
import {MaterialModule} from '../../material/material.module';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PanelModule} from '../../panel/panel.module';
import {SideMenuContentModule} from '../../side-menu/content-components/side-menu-content.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HeaderModule} from '../../header/header.module';
import {WorkflowHeaderService} from '../../header/workflow-header/workflow-header.service';

describe('WorkflowViewComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowViewComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientModule,
                PanelModule,
                HeaderModule,
                HttpClientTestingModule,
                SideMenuContentModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                WorkflowHeaderService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkflowViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
