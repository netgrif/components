import {AbstractGroupNavigationComponentResolverComponent} from './abstract-group-navigation-component-resolver.component';
import {Component, Injector, ChangeDetectionStrategy} from '@angular/core';
import {LoggerService} from '../../logger/services/logger.service';
import {GroupNavigationComponentResolverService} from './group-navigation-component-resolver.service';
import {ActivatedRoute, convertToParamMap, Router, RouterModule} from '@angular/router';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {TestGroupNavigationComponentResolverService} from './group-navigation-component-resolver.service.spec';
import {DataGroup} from "../../resources/interface/data-groups";
import {of, Observable} from "rxjs";
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';

describe('AbstractGroupNavigationComponentResolverComponent', () => {
    let component: TestAbstractGroupNavigationComponentResolverComponent;
    let fixture: ComponentFixture<TestAbstractGroupNavigationComponentResolverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestAbstractGroupNavigationComponentResolverComponent
            ],
            imports: [
                MaterialModule,
                TranslateLibModule,
                RouterModule.forRoot([])
            ],
            providers: [
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: GroupNavigationComponentResolverService, useClass: TestGroupNavigationComponentResolverService},
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: convertToParamMap({itemCaseId: 'thisIsEncodedCaseId'})
                        }
                    }
                },
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting()
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
    selector: 'ncc-test-group-navigation',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
