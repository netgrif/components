import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
import {ResizableModule} from 'angular-resizable-element';
import {HotkeyModule} from 'angular2-hotkeys';
import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {AppModule} from '../../app.module';
import {CdkImportModule} from '../../cdk-import/cdk-import.module';
import {MaterialImportModule} from '../../material-import/material-import.module';

import {ControlPanelComponent} from './control-panel.component';

describe('ControlPanelComponent', () => {
    let component: ControlPanelComponent;
    let fixture: ComponentFixture<ControlPanelComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
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
                JoyrideModule.forRoot(),
                MatSortModule,
                ResizableModule,
                HttpClientTestingModule,
                AppModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [{provide: ModelService, useClass: MockModelService}]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ControlPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class MockModelService {
    model = new Model();
    whichButton = new BehaviorSubject('');
}
