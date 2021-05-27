import {TestBed} from '@angular/core/testing';
import {CategoryFactory} from './category-factory';
import {OperatorService} from '../operator-service/operator.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AllowedNetsService} from '../../allowed-nets/services/allowed-nets.service';
import {TestNoAllowedNetsFactory} from '../../utility/tests/test-factory-methods';
import {AllowedNetsServiceFactory} from '../../allowed-nets/services/factory/allowed-nets-service-factory';

describe('CategoryFactoryService', () => {
    let service: CategoryFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                OperatorService,
                {provide: TaskViewService, useValue: null},
                {provide: CaseViewService, useValue: null},
                {provide: UserResourceService, useValue: null},
                {provide: ConfigurationService, useClass: TestConfigurationService},
                CategoryFactory,
                {provide: AllowedNetsService, useFactory: TestNoAllowedNetsFactory, deps: [AllowedNetsServiceFactory]}
            ]
        });
        service = TestBed.inject(CategoryFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
