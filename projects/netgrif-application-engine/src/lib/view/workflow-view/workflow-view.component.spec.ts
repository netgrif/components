import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowViewComponent} from './workflow-view.component';
import {MaterialModule} from '../../material/material.module';
import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, TemplateRef} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PanelModule} from '../../panel/panel.module';
import {SideMenuContentModule} from '../../side-menu/content-components/side-menu-content.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {DashboardCardTypes} from '../../dashboard/cards/model/dashboard-card-types';
import {TestConfigurationService} from '../../utility/tests/test-config';

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
                HttpClientTestingModule,
                SideMenuContentModule
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [{provide: ConfigurationService, useClass: TestConfigurationService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkflowViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});
