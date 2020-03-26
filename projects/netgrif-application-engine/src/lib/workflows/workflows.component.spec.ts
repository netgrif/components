import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsComponent} from './workflows.component';
import {MaterialModule} from '../material/material.module';
import {Component, Input, TemplateRef} from '@angular/core';
import {SideMenuContainerComponent} from '../side-menu/side-menu-container/side-menu-container.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('WorkflowsComponent', () => {
    let component: WorkflowsComponent;
    let fixture: ComponentFixture<WorkflowsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowsComponent,
                HeaderStubComponent,
                WorkflowsPanelGroupStubComponent,
                SideMenuContainerComponent
            ],
            imports: [MaterialModule, NoopAnimationsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkflowsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({selector: 'nae-header', template: ''})
class HeaderStubComponent {
}

@Component({selector: 'nae-workflows-panel-group', template: ''})
class WorkflowsPanelGroupStubComponent {
}
