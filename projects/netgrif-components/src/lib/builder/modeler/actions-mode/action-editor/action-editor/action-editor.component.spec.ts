import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
// import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';
import {ResizableModule} from 'angular-resizable-element';
import {HotkeyModule} from 'angular2-hotkeys';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {CdkImportModule} from '../../../../cdk-import/cdk-import.module';
import {MaterialImportModule} from '../../../../material-import/material-import.module';
import {ActionType, EditableAction} from '../classes/editable-action';
import {ActionEditorComponent} from './action-editor.component';

describe('ActionEditorComponent', () => {
    let component: ActionEditorComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ActionEditorComponent, TestWrapperComponent],
            imports: [
                CommonModule,
                MaterialImportModule,
                CdkImportModule,
                // FlexLayoutModule,
                FormsModule,
                MatCheckboxModule,
                MatTabsModule,
                RouterModule,
                MonacoEditorModule.forRoot(),
                HotkeyModule.forRoot(),
                MatSortModule,
                ResizableModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'nc-builder-test-wrapper',
    template: '<nc-builder-action-editor [action]="action" ></nc-builder-action-editor>'
})
class TestWrapperComponent {
    action;

    constructor() {
        this.action = new EditableAction('', ActionType.DATA, true);
    }
}
