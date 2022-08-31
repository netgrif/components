import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HotkeyModule, HotkeysService} from 'angular2-hotkeys';
import {of, Subject} from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token';
import {SideMenuControl} from '../../models/side-menu-control';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {MaterialModule} from '../../../material/material.module';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {ErrorSnackBarComponent} from '../../../snack-bar/components/error-snack-bar/error-snack-bar.component';
import {SuccessSnackBarComponent} from '../../../snack-bar/components/success-snack-bar/success-snack-bar.component';
import {Component, Inject} from '@angular/core';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {AbstractNewCaseComponent} from './abstract-new-case.component';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {tap} from 'rxjs/operators';
import {PetriNetReferenceWithPermissions} from '../../../process/petri-net-reference-with-permissions';

describe('AbstractNewCaseComponent', () => {
    let component: TestNewCaseComponent;
    let fixture: ComponentFixture<TestNewCaseComponent>;
    let allowedNets$: Subject<Array<PetriNetReferenceWithPermissions>>;
    let allowedNetsTapCount: number;

    beforeEach(waitForAsync(() => {
        allowedNets$ = new Subject<Array<PetriNetReferenceWithPermissions>>();

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MaterialModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                SnackBarModule,
                TranslateLibModule,
                HotkeyModule.forRoot()
            ],
            providers: [
                HotkeysService,
                {
                    provide: NAE_SIDE_MENU_CONTROL,
                    useValue: new SideMenuControl(undefined, undefined, () => of('close'), {
                        allowedNets$: allowedNets$.pipe(tap(() => {
                            allowedNetsTapCount++;
                        }))})
                },
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            declarations: [
                TestNewCaseComponent,
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [
                    ErrorSnackBarComponent,
                    SuccessSnackBarComponent
                ]
            }
        }).compileComponents();
        allowedNetsTapCount = 0;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNewCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should subscribe to allowedNets only once', () => {
        allowedNets$.next([]);
        expect(component).toBeTruthy();
        expect(allowedNetsTapCount).toEqual(1);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-newcase',
    template: ''
})
class TestNewCaseComponent extends AbstractNewCaseComponent {
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) protected _sideMenuControl: SideMenuControl,
                protected _formBuilder: FormBuilder,
                protected _snackBarService: SnackBarService,
                protected _caseResourceService: CaseResourceService,
                protected _hotkeysService: HotkeysService,
                protected _translate: TranslateService) {
        super(_sideMenuControl, _formBuilder, _snackBarService, _caseResourceService, _hotkeysService, _translate);
    }
}
