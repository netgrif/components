import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkflowPanelGroupComponent} from './workflow-panel-group.component';
import {MatExpansionModule, MatFormFieldModule, MatTooltipModule} from '@angular/material';
import {WorkflowsPanelComponent} from '../../panel/workflows-panel/workflows-panel.component';
import {TextFieldComponent} from '../../data-fields/text-field/text-field.component';
import {PanelComponent} from '../../panel/panel.component';
import {DataFieldTemplateComponent} from '../../data-fields/data-field-template/data-field-template.component';
import {TextareaFieldComponent} from '../../data-fields/text-field/textarea-field/textarea-field.component';
import {SimpleTextFieldComponent} from '../../data-fields/text-field/simple-text-field/simple-text-field.component';
import {RequiredLabelComponent} from '../../data-fields/required-label/required-label.component';
import {FormControl} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {DataFieldsModule} from '../../data-fields/data-fields.module';

describe('WorkflowsPanelGroupComponent', () => {
    let component: WorkflowPanelGroupComponent;
    let fixture: ComponentFixture<WorkflowPanelGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WorkflowPanelGroupComponent,
                WorkflowsPanelComponent,
                TextFieldComponent,
                PanelComponent,
                DataFieldTemplateComponent,
                TextareaFieldComponent,
                SimpleTextFieldComponent,
                RequiredLabelComponent
            ],
            imports: [
                MatExpansionModule,
                MaterialModule,
                DataFieldsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkflowPanelGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
});

