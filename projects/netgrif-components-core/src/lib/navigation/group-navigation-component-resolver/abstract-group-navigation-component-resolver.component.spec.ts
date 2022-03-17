import {AbstractGroupNavigationComponentResolverComponent} from './abstract-group-navigation-component-resolver.component';
import {Component, Injector} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TestGroupNavigationComponentResolverService} from './group-navigation-component-resolver.service.spec';

describe('AbstractGroupNavigationComponentResolverComponent', () => {
    let component: TestAbstractGroupNavigationComponentResolverComponent;
    let fixture: ComponentFixture<TestAbstractGroupNavigationComponentResolverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
                RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: GroupNavigationComponentResolverService, useClass: TestGroupNavigationComponentResolverService}
            ],
            declarations: [
                TestAbstractGroupNavigationComponentResolverComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestAbstractGroupNavigationComponentResolverComponent);
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


@Component({
    selector: 'nae-test-group-navigation',
    template: ''
})
class TestAbstractGroupNavigationComponentResolverComponent extends AbstractGroupNavigationComponentResolverComponent {
    constructor(componentResolverService: GroupNavigationComponentResolverService,
                parentInjector: Injector,
                activatedRoute: ActivatedRoute,
                router: Router,
                log: LoggerService) {
        super(componentResolverService, parentInjector, activatedRoute, router, log);
    }
}
