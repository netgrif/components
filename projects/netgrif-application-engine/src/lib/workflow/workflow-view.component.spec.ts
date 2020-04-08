import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowViewComponent} from './workflow-view.component';
import {MaterialModule} from '../material/material.module';
import {Component, Input, TemplateRef} from '@angular/core';
import {SideMenuContainerComponent} from '../side-menu/side-menu-container/side-menu-container.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

describe('WorkflowsComponent', () => {
    let component: WorkflowViewComponent;
    let fixture: ComponentFixture<WorkflowViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowViewComponent,
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
        fixture = TestBed.createComponent(WorkflowViewComponent);
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
