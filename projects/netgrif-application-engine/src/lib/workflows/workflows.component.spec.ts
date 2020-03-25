import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsComponent} from './workflows.component';
import {MaterialModule} from '../material/material.module';
import {WorkflowsPanelGroupComponent} from './workflows-panel-group/workflows-panel-group.component';
import {SortModeComponent} from '../header/header-modes/sort-mode/sort-mode.component';
import {SearchModeComponent} from '../header/header-modes/search-mode/search-mode.component';
import {EditModeComponent} from '../header/header-modes/edit-mode/edit-mode.component';
import {WorkflowsPanelComponent} from '../panel/workflows-panel/workflows-panel.component';
import {TextFieldComponent} from '../data-fields/text-field/text-field.component';
import {Component, Input, TemplateRef} from '@angular/core';
import {CaseHeaderService} from '../header/case-header/case-header.service';
import {WorkflowPanelDefinition} from '../panel/workflows-panel/models/workflows-panels-definition';

describe('WorkflowsComponent', () => {
    let component: WorkflowsComponent;
    let fixture: ComponentFixture<WorkflowsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowsComponent,
                HeaderStubComponent,
                WorkflowsPanelGroupStubComponent
            ],
            imports: [MaterialModule]
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
