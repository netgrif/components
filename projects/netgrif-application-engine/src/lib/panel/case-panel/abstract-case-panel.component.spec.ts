import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, NO_ERRORS_SCHEMA, Optional} from '@angular/core';
import {of} from 'rxjs';
import {AbstractCasePanelComponent} from './abstract-case-panel.component';
import {HeaderColumn, HeaderColumnType} from '../../header/models/header-column';
import {CaseMetaField} from '../../header/case-header/case-menta-enum';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TestCaseBaseFilterProvider, TestCaseViewAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {SearchService} from '../../search/search-service/search.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {SignUpService} from '../../authentication/sign-up/services/sign-up.service';
import {OverflowService} from '../../header/services/overflow.service';
import {UserService} from '../../user/services/user.service';
import {Case} from '../../resources/interface/case';
import {NAE_BASE_FILTER} from '../../search/models/base-filter-injection-token';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';
import {PermissionService} from '../../authorization/permission/permission.service';

describe('AbstractCasePanelComponent', () => {
    let component: TestCasePanelComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                CommonModule,
                FlexModule,
                BrowserAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule
            ],
            providers: [
                SnackBarService,
                LoggerService,
                TranslateService,
                CaseResourceService,
                CaseViewService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                SearchService,
                CurrencyPipe,
                {
                    provide: NAE_BASE_FILTER,
                    useFactory: TestCaseBaseFilterProvider
                },
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                SignUpService,
                {provide: AllowedNetsService, useFactory: TestCaseViewAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ],
            declarations: [
                TestCasePanelComponent,
                TestWrapperComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('show', () => {
        expect(component.show(new MouseEvent('type'))).toEqual(false);
    });

    it('should test canDo', () => {
        expect(component.canDelete()).toBeTrue();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-case-panel',
    template: ''
})
class TestCasePanelComponent extends AbstractCasePanelComponent {
    constructor(protected _caseResourceService: CaseResourceService, protected _caseViewService: CaseViewService,
                protected _snackBarService: SnackBarService, protected _translateService: TranslateService,
                protected _log: LoggerService, @Optional() protected overflowService: OverflowService,
                protected _userService: UserService, protected _currencyPipe: CurrencyPipe,
                protected _permissionService: PermissionService) {
        super(_caseResourceService, _caseViewService, _snackBarService, _translateService, _log, overflowService,
            _userService, _currencyPipe, _permissionService);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-case-panel [selectedHeaders$]="selectedHeaders" [case_]="case_"> </nae-test-case-panel>'
})
class TestWrapperComponent {
    selectedHeaders =  of([
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.VISUAL_ID, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.AUTHOR, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.META, CaseMetaField.TITLE, 'string', 'string'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'date', 'string', 'string', true, 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'string', 'string', 'string', true, 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'dateTime', 'string', 'string', true, 'netid'),
        new HeaderColumn(HeaderColumnType.IMMEDIATE, 'enum', 'string', 'string', true, 'netid'),
    ]);
    case_: Case = {
        stringId: 'string',
        title: 'string',
        author: {email: 'email', fullName: 'fullName'},
        permissions: {},
        users: {},
        color: 'color',
        creationDate: [],
        lastModified: [],
        visualId: '',
        resetArcTokens: {},
        processIdentifier: '',
        petriNetId: '',
        petriNetObjectId: {
            counter: 0,
            date: 0,
            machineIdentifier: 0,
            processIdentifier: 0,
            time: 0,
            timeSecond: 0,
            timestamp: 0
        },
        immediateData: [
            {stringId: 'date', title: 'string', type: 'date', value: [2020, 1, 1, 10, 10]},
            {stringId: 'string', title: 'string', type: 'string', value: 'dasdsadsad'},
            {stringId: 'dateTime', title: 'string', type: 'dateTime', value: [2020, 1, 1, 10, 10]},
            {stringId: 'enum', title: 'string', type: 'enumeration', value: { defaultValue: 'dasd'}},
        ]
    };
}
