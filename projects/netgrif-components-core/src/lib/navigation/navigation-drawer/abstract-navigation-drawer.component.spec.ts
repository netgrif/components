import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@ngbracket/ngx-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AbstractNavigationDrawerComponent} from './abstract-navigation-drawer.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {LoggerService} from '../../logger/services/logger.service';
import {RouterTestingModule} from '@angular/router/testing';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {MockUserPreferenceService} from '../../utility/tests/mocks/mock-user-preference.service';
import {ResizableModule} from 'angular-resizable-element';
import {TestLoggingConfigurationService} from '../../utility/tests/test-logging-config';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';

describe('AbstractNavigationDrawerComponent', () => {
    let component: TestDrawerComponent;
    let fixture: ComponentFixture<TestDrawerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestDrawerComponent],
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                TranslateLibModule,
                HttpClientTestingModule,
                ResizableModule
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestLoggingConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: UserPreferenceService, useClass: MockUserPreferenceService}
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
        spyOn(console, 'info');
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open', (done) => {
        component.open().then(res  => {
            expect(res).toEqual('open');
            expect(console.info).toHaveBeenCalled();
            done();
        });
    });

    it('should close', (done) => {
        component.close().then(res  => {
            expect(res).toEqual('close');
            done();
        });
    });

    it('should toggle', (done) => {
        component.toggle().then(res  => {
            expect(res).toEqual('open');
            done();
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'ncc-test-nav-drawer',
    template: '<mat-sidenav-container class="drawer-container"  (panright)="swipeRight()" (panleft)="swipeLeft()">\n' +
        '    <mat-sidenav #sidenav [mode]="config.mode" [(opened)]="opened" position="start"\n' +
        '                 [disableClose]="config.disableClose" class="drawer-content mat-elevation-z10">\n' +
        '    </mat-sidenav>\n' +
        '    <mat-sidenav-content>\n' +
        '        <ng-content></ng-content>\n' +
        '    </mat-sidenav-content>\n' +
        '</mat-sidenav-container>'
})
class TestDrawerComponent extends AbstractNavigationDrawerComponent {
    constructor(protected breakpoint: BreakpointObserver,
                protected _log: LoggerService,
                protected userPreferenceService: UserPreferenceService) {
        super(breakpoint, _log, userPreferenceService);
    }
}


