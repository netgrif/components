import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {ResizableModule} from 'angular-resizable-element';
import {HotkeyModule} from 'angular2-hotkeys';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {CdkImportModule} from '../../../../cdk-import/cdk-import.module';
import {MaterialImportModule} from '../../../../material-import/material-import.module';

import {TriggerTreeComponent} from './trigger-tree.component';

describe('TriggerTreeComponent', () => {
    let component: TriggerTreeComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TriggerTreeComponent, TestWrapperComponent],
            imports: [
                CommonModule,
                MaterialImportModule,
                CdkImportModule,
                FlexLayoutModule,
                FormsModule,
                MatCheckboxModule,
                MatTabsModule,
                RouterModule,
                MonacoEditorModule.forRoot(),
                HotkeyModule.forRoot(),
                MatSortModule,
                ResizableModule,
                NoopAnimationsModule
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
    template: '<mat-sidenav #sidenav><nc-builder-trigger-tree [nav]="sidenav" [triggers]="[]"></nc-builder-trigger-tree></mat-sidenav>'
})
class TestWrapperComponent {
}
