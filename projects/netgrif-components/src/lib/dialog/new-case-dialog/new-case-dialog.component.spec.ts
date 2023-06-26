import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCaseDialogComponent } from './new-case-dialog.component';
import {CommonModule} from '@angular/common';
import {
    ConfigurationService, ErrorSnackBarComponent,
    MaterialModule,
    SnackBarModule, SuccessSnackBarComponent, TestConfigurationService,
    TranslateLibModule,
    AuthenticationMethodService,
    MockAuthenticationMethodService,
    AuthenticationService,
    MockAuthenticationService,
    UserResourceService,
    MockUserResourceService,
    NewCaseInjectionData,
    PetriNetReference
} from '@netgrif/components-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HotkeyModule, HotkeysService} from 'angular2-hotkeys';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs";

describe('NewCaseDialogComponent', () => {
  let component: NewCaseDialogComponent;
  let fixture: ComponentFixture<NewCaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
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
            {provide: ConfigurationService, useClass: TestConfigurationService},
            {
                provide: MAT_DIALOG_DATA, useValue: {allowedNets$: new Observable<Array<PetriNetReference>>()} as NewCaseInjectionData
            },
            { provide: MatDialogRef, useValue: {} },
            { provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService },
            { provide: AuthenticationService, useClass: MockAuthenticationService },
            { provide: UserResourceService, useClass: MockUserResourceService }
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
