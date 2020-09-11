import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchService} from '../../search-service/search.service';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';
import {AuthenticationService} from '../../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../../utility/tests/mocks/mock-authentication.service';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../../utility/tests/mocks/mock-user-resource.service';
import {Component} from '@angular/core';
import {ConfigTaskViewServiceFactory} from '../../../view/task-view/service/factory/config-task-view-service-factory';
import {TestTaskSearchServiceFactory, TestTaskViewFactory} from '../../../utility/tests/test-factory-methods';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {CategoryFactory} from '../../category-factory/category-factory';
import {AbstractTaskSearchComponent} from './abstract-task-search.component';
import {SnackBarModule} from '../../../snack-bar/snack-bar.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import {MockAuthenticationMethodService} from '../../../utility/tests/mocks/mock-authentication-method-service';

describe('AbstractTaskSearchComponent', () => {
    let component: TestTaskSearchComponent;
    let fixture: ComponentFixture<TestTaskSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                NoopAnimationsModule,
                SnackBarModule,
                TranslateLibModule
            ],
            providers: [
                ConfigTaskViewServiceFactory,
                {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
                CategoryFactory,
                {
                    provide: SearchService,
                    useFactory: TestTaskSearchServiceFactory
                },
                {   provide: TaskViewService,
                    useFactory: TestTaskViewFactory,
                    deps: [ConfigTaskViewServiceFactory]},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService},
            ],
            declarations: [TestTaskSearchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTaskSearchComponent);
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
    selector: 'nae-test-search',
    template: ''
})
class TestTaskSearchComponent extends AbstractTaskSearchComponent {
    constructor(protected _categoryFactory: CategoryFactory) {
        super(_categoryFactory);
    }
}
