import {TestBed} from '@angular/core/testing';
import {CategoryFactory} from './category-factory';
import {OperatorService} from '../operator-service/operator.service';
import {LoggerService} from '../../logger/services/logger.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfigurationService} from '../../configuration/configuration.service';
import {NetgrifApplicationEngine} from '../../configuration/interfaces/schema';
import {CaseViewService} from '../../view/case-view/service/case-view-service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';

describe('CategoryFactoryService', () => {
    let service: CategoryFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                OperatorService,
                {provide: LoggerService, useValue: null},
                {provide: CaseViewService, useValue: null},
                {provide: UserResourceService, useValue: null},
                CategoryFactory
            ]
        });
        service = TestBed.inject(CategoryFactory);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
