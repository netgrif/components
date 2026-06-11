import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';
import {ResizableModule} from 'angular-resizable-element';
import {HotkeyModule} from 'angular2-hotkeys';
import {CdkImportModule} from '../../../../cdk-import/cdk-import.module';
import {MaterialImportModule} from '../../../../material-import/material-import.module';
import {ModelerModule} from '../../../modeler.module';
import {ActionEditorService} from '../action-editor.service';
import {ActionType} from '../classes/editable-action';
import {LeafNode} from '../classes/leaf-node';
import {ActionEditorListComponent} from './action-editor-list.component';

describe('ActionEditorListComponent', () => {
    let component: ActionEditorListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [
                CommonModule,
                MaterialImportModule,
                CdkImportModule,
                FormsModule,
                MatCheckboxModule,
                MatTabsModule,
                RouterModule,
                HotkeyModule.forRoot(),
                MatSortModule,
                ResizableModule,
                ModelerModule
            ]
        })
            .compileComponents();
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
    template: '<nc-builder-action-editor-list [leafNode]="leafNode"></nc-builder-action-editor-list>'
})
class TestWrapperComponent {
    leafNode;

    constructor(private actionEditorService: ActionEditorService) {
        this.leafNode = new LeafNode(ActionType.TRANSITION, actionEditorService);
    }
}
