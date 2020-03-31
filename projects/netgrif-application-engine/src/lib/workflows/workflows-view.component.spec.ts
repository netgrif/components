import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsViewComponent} from './workflows-view.component';
import {MaterialModule} from '../material/material.module';
import {Component, Input, TemplateRef} from '@angular/core';
import {SideMenuContainerComponent} from '../side-menu/side-menu-container/side-menu-container.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

describe('WorkflowsComponent', () => {
    let component: WorkflowsViewComponent;
    let fixture: ComponentFixture<WorkflowsViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowsViewComponent,
                HeaderStubComponent,
                WorkflowsPanelGroupStubComponent,
                SideMenuContainerComponent
            ],
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                HttpClientModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkflowsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

@Component({selector: 'nae-header', template: ''})
class HeaderStubComponent {
}

@Component({selector: 'nae-workflows-panel-group', template: ''})
class WorkflowsPanelGroupStubComponent {
}
