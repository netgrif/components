import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCaseDialogComponent } from './new-case-dialog.component';
import { CommonModule } from '@angular/common';
import {
    ConfigurationService,
    ErrorSnackBarComponent,
    MaterialModule,
    SnackBarModule,
    SuccessSnackBarComponent,
    TestConfigurationService,
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
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HotkeyModule, HotkeysService } from 'angular2-hotkeys';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef
} from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    provideHttpClient,
    withInterceptorsFromDi,
    withXhr
} from '@angular/common/http';

function configure(data: NewCaseInjectionData) {
    return TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [NewCaseDialogComponent],
            imports: [
                CommonModule,
                MaterialModule,
                SnackBarModule,
                TranslateLibModule,
                HotkeyModule.forRoot(),
                MatDialogModule
            ],
            providers: [
                HotkeysService,
                {
                    provide: ConfigurationService,
                    useClass: TestConfigurationService
                },
                {provide: MAT_DIALOG_DATA, useValue: data},
                {provide: MatDialogRef, useValue: {close: () => {}}},
                {
                    provide: AuthenticationMethodService,
                    useClass: MockAuthenticationMethodService
                },
                {
                    provide: AuthenticationService,
                    useClass: MockAuthenticationService
                },
                {
                    provide: UserResourceService,
                    useClass: MockUserResourceService
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
            ]
        }).compileComponents();
}

describe('NewCaseDialogComponent', () => {
    let component: NewCaseDialogComponent;
    let fixture: ComponentFixture<NewCaseDialogComponent>;

    beforeEach(async () => {
        await configure({allowedNets$: new Observable<Array<PetriNetReference>>()} as NewCaseInjectionData);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCaseDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

describe('NewCaseDialogComponent with more processes', () => {
    const nets = [
        {stringId: 'n1', title: 'Claim', version: '1.0.0', identifier: 'claim'},
        {stringId: 'n2', title: 'Order', version: '2.0.0', identifier: 'order', defaultCaseName: 'Order'}
    ] as Array<PetriNetReference>;

    function create(): NewCaseDialogComponent {
        const fixture = TestBed.createComponent(NewCaseDialogComponent);
        fixture.detectChanges();
        return fixture.componentInstance;
    }

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('starts with the list of the processes and continues with the title', async () => {
        await configure({allowedNets$: of(nets), newCaseCreationConfiguration: {enableCaseTitle: true, isCaseTitleRequired: true}} as any);
        const component = create();
        expect(component.step).toBe('process');
        const createSpy = spyOn(component, 'createNewCase');
        component.selectProcess(component.options[0]);
        expect(component.step).toBe('title');
        expect(createSpy).not.toHaveBeenCalled();
        component.backToProcess();
        expect(component.step).toBe('process');
    });

    it('creates the case right after the process is picked when there is no title to fill in', async () => {
        await configure({allowedNets$: of(nets), newCaseCreationConfiguration: {enableCaseTitle: false, isCaseTitleRequired: false}} as any);
        const component = create();
        const createSpy = spyOn(component, 'createNewCase');
        component.selectProcess(component.options[0]);
        expect(createSpy).toHaveBeenCalled();
    });

    it('creates the case right after a process with a default case name is picked', async () => {
        await configure({allowedNets$: of(nets), newCaseCreationConfiguration: {enableCaseTitle: true, isCaseTitleRequired: true}} as any);
        const component = create();
        const createSpy = spyOn(component, 'createNewCase');
        component.selectProcess(component.options[1]);
        expect(createSpy).toHaveBeenCalled();
    });

    it('Enter picks the only process left by the search', async () => {
        await configure({allowedNets$: of(nets), newCaseCreationConfiguration: {enableCaseTitle: true, isCaseTitleRequired: true}} as any);
        const fixture = TestBed.createComponent(NewCaseDialogComponent);
        fixture.detectChanges();
        const component = fixture.componentInstance;
        component.searchFormControl.setValue('cla');
        fixture.detectChanges();
        component.nextStep();
        expect(component.step).toBe('title');
        expect(component.selectedProcess()?.value).toBe('n1');
    });
});
