import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../material/material.module';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {Component} from '@angular/core';
import {AbstractNavigationTreeComponent} from './abstract-navigation-tree.component';
import {Router} from '@angular/router';

describe('AbstractNavigationTreeComponent', () => {
    let component: TestTreeComponent;
    let fixture: ComponentFixture<TestTreeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestTreeComponent],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ],
            imports: [
                CommonModule,
                MaterialModule,
                FlexModule,
                FlexLayoutModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule,
                TranslateLibModule,
                NoopAnimationsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Component({
    selector: 'nae-test-nav-tree',
    template: ''
})
class TestTreeComponent extends AbstractNavigationTreeComponent {
    constructor(protected _config: ConfigurationService, protected _router: Router) {
        super(_config, _router);
    }
}
