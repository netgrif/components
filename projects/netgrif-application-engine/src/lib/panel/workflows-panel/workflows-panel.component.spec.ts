import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowsPanelComponent} from './workflows-panel.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {PanelComponent} from '../panel.component';
import {MaterialModule} from '../../material/material.module';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {WorkflowPanelDefinition} from './models/workflows-panels-definition';

describe('WorkflowsPanelComponent', () => {
    let component: WorkflowsPanelComponent;
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
            declarations: [WorkflowsPanelComponent, PanelComponent, TestWrapperComponent],
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
    template: '<nae-workflows-panel [workflowPanelDefinition]="caseDef"> </nae-workflows-panel>'
})
class TestWrapperComponent {
    public caseDef: WorkflowPanelDefinition = {
        panelContent: {
            netIdentifier: 'id',
            uploaded: [30, 3, 2020, 21, 17, 50],
            author: 'tes',
            version: 'q',
            title: 'e'
        },
        column0: '0',
        column1: '1',
        column2: '2',
        column3: '3',
        column4: '4',
    };
}
