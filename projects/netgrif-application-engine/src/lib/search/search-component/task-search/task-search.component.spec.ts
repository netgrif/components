import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskSearchComponent} from './task-search.component';
import {SearchModule} from '../../search.module';
import {ConfigurationService} from '../../../configuration/configuration.service';
import {TestConfigurationService} from '../../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SearchService} from '../../search-service/search.service';
import {TestTaskSearchServiceFactory, TestTaskViewFactory} from '../../../utility/tests/test-factory-methods';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskViewService} from '../../../view/task-view/service/task-view.service';
import {ConfigTaskViewServiceFactory} from '../../../view/task-view/service/factory/config-task-view-service-factory';
import {AuthenticationMethodService} from '../../../authentication/services/authentication-method.service';

describe('TaskSearchComponent', () => {
    let component: TaskSearchComponent;
    let fixture: ComponentFixture<TaskSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SearchModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                ConfigTaskViewServiceFactory,
                AuthenticationMethodService,
                {
                    provide: SearchService,
                    useFactory: TestTaskSearchServiceFactory
                },
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {   provide: TaskViewService,
                    useFactory: TestTaskViewFactory,
                    deps: [ConfigTaskViewServiceFactory]},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
