import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ResizableModule} from 'angular-resizable-element';
import {HotkeyModule} from 'angular2-hotkeys';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {CdkImportModule} from '../../cdk-import/cdk-import.module';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {ModelerModule} from '../modeler.module';
import {ActionsModeComponent} from './actions-mode.component';

describe('ActionsModeComponent', () => {
    let component: ActionsModeComponent;
    let fixture: ComponentFixture<ActionsModeComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientModule,
                MaterialImportModule,
                CommonModule,
                CdkImportModule,
                // FlexLayoutModule,
                FormsModule,
                MatCheckboxModule,
                MatTabsModule,
                RouterModule,
                MonacoEditorModule.forRoot(),
                HotkeyModule.forRoot(),
                MatSortModule,
                ResizableModule,
                ModelerModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionsModeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
