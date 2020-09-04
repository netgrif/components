import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Component} from '@angular/core';
import {AbstractNavigationDrawerComponent} from './abstract-navigation-drawer.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {LoggerService} from '../../logger/services/logger.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('AbstractNavigationDrawerComponent', () => {
    let component: TestDrawerComponent;
    let fixture: ComponentFixture<TestDrawerComponent>;

    beforeEach(async(() => {
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
                HttpClientTestingModule
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open', async () => {
        await component.open().then(res  => {
            expect(res).toEqual('open');
        });
    });

    it('should close', async () => {
        await component.close().then(res  => {
            expect(res).toEqual('open');
        });
    });

    it('should toggle', async () => {
        await component.toggle().then(res  => {
            expect(res).toEqual('open');
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-nav-drawer',
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
    constructor(protected breakpoint: BreakpointObserver, protected _log: LoggerService) {
        super(breakpoint, _log);
    }
}


