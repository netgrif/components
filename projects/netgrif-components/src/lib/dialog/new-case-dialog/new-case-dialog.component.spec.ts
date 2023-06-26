import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCaseDialogComponent } from './new-case-dialog.component';
import {CommonModule} from '@angular/common';
import {
    ConfigurationService, ErrorSnackBarComponent,
    MaterialModule,
    SnackBarModule, SuccessSnackBarComponent, TestConfigurationService,
    TranslateLibModule
} from 'netgrif-components-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HotkeyModule, HotkeysService} from 'angular2-hotkeys';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MatDialogModule} from '@angular/material/dialog';

describe('NewCaseDialogComponent', () => {
  let component: NewCaseDialogComponent;
  let fixture: ComponentFixture<NewCaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            CommonModule,
            MaterialModule,
            BrowserAnimationsModule,
            HttpClientTestingModule,
            SnackBarModule,
            TranslateLibModule,
            HotkeyModule.forRoot(),
            MatDialogModule
        ],
        providers: [
            HotkeysService,
            {provide: ConfigurationService, useClass: TestConfigurationService}
        ],
        declarations: [
            NewCaseDialogComponent,
        ],
    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
            entryComponents: [
                ErrorSnackBarComponent,
                SuccessSnackBarComponent
            ]
        }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
