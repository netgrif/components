import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {WorkflowPanelComponent} from './workflow-panel.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {of} from 'rxjs';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';


describe('WorkflowPanelComponent', () => {
    let component: WorkflowPanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                DataFieldsModule
            ],
            declarations: [WorkflowPanelComponent, PanelComponent, TestWrapperComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-workflow-panel [workflow]="workflow" [selectedHeaders$]="selectedHeaders"></nae-workflow-panel>'
})
class TestWrapperComponent {
    public selectedHeaders = of([]);
    public workflow: PetriNetReference = {
        author: {
            email: '',
            fullName: '',
        },
        createdDate: [2020, 4, 8],
        defaultCaseName: '',
        identifier: '',
        immediateData: undefined,
        initials: '',
        stringId: '',
        title: '',
        version: ''
    };
}
