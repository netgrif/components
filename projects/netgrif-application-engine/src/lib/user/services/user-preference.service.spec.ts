import {TestBed} from '@angular/core/testing';
import {UserPreferenceService} from './user-preference.service';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {MockUserResourceService} from '../../utility/tests/mocks/mock-user-resource.service';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from '../../utility/tests/test-config';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {MockAuthenticationService} from '../../utility/tests/mocks/mock-authentication.service';
import {MatSnackBarModule} from '@angular/material';

describe('UserPreferenceService', () => {
    let service: UserPreferenceService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatSnackBarModule],
            providers: [
                AuthenticationMethodService,
                {provide: ConfigurationService, useClass: TestConfigurationService},
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: UserResourceService, useClass: MockUserResourceService}
            ]
        });
        service = TestBed.inject(UserPreferenceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test user preferencies', () => {
        service.setTaskFilters('viewId', ['filterId']);
        const taskFilters = service.getTaskFilters('viewId');
        expect(taskFilters.length).toEqual(1);
        expect(taskFilters[0]).toEqual('filterId');

        service.setCaseFilters('viewId', ['filterId']);
        const caseFilters = service.getCaseFilters('viewId');
        expect(caseFilters.length).toEqual(1);
        expect(caseFilters[0]).toEqual('filterId');

        service.setHeaders('viewId', ['header0']);
        const headers = service.getHeaders('viewId');
        expect(headers.length).toEqual(1);
        expect(headers[0]).toEqual('header0');

        service.setLocale('sk-SK');
        expect(service.getLocale).toEqual('sk-SK');

        service.setOther('key', 'value');
        expect(service.getOther('key')).toEqual('value');
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });
});
