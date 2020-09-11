import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Component, Optional} from '@angular/core';
import {AbstractSearchComponent} from './abstract-search.component';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from '../search-service/search.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SearchChipService} from '../search-chip-service/search-chip.service';
import {MockAuthenticationMethodService} from '../../utility/tests/mocks/mock-authentication-method-service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {TestCaseSearchServiceFactory} from '../../utility/tests/test-factory-methods';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {MaterialModule} from '../../material/material.module';

describe('AbstractSearchComponent', () => {
    let component: TestSearchComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                TranslateLibModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
                {provide: SearchService, useFactory: TestCaseSearchServiceFactory}
            ],
            declarations: [
                TestSearchComponent,
                TestComponent,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.children[0].componentInstance;
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
    selector: 'nae-test-search',
    template: ''
})
class TestSearchComponent extends AbstractSearchComponent {
    constructor(protected _translate: TranslateService,
                protected _searchService: SearchService,
                protected _logger: LoggerService,
                @Optional() protected _searchChipService: SearchChipService) {
        super(_translate, _searchService, _logger, _searchChipService);
    }
}

@Component({
    selector: 'nae-test-wrapper',
    template: '<nae-test-search [searchCategories]="arr"></nae-test-search>'
})
class TestComponent {
    arr = [];
}
