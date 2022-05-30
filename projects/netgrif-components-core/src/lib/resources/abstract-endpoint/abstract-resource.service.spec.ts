import {TestBed} from '@angular/core/testing';
import {AbstractResourceService} from './abstract-resource.service';
import {Injectable} from '@angular/core';
import {ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AbstractResourceService', () => {
    let service: TestAbstractResourceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NoopAnimationsModule],
            providers: [
                TestAbstractResourceService,
                {provide: ConfigurationService, useClass: TestConfigurationService}
            ]
        });
        service = TestBed.inject(TestAbstractResourceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test changeType function', () => {
        expect(service.changeTypeTest({_embedded: []}, undefined)).toEqual([]);
        expect(service.changeTypeTest({_embedded: {fields: []}}, 'fields')).toEqual([]);
        expect(service.changeTypeTest({_embedded: []}, 'fields')).toEqual([]);
        expect(service.changeTypeTest({}, undefined)).toEqual({});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});

@Injectable()
class TestAbstractResourceService extends AbstractResourceService {
    constructor(provider: ResourceProvider, configService: ConfigurationService) {
        super('', provider, configService);
    }

    public changeTypeTest<T>(r: any, propertiesParams: string): T {
        return this.changeType(r, propertiesParams);
    }
}
