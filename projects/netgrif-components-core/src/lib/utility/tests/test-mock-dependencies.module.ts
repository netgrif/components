import {NgModule} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthenticationMethodService} from '../../authentication/services/authentication-method.service';
import {MockAuthenticationMethodService} from './mocks/mock-authentication-method-service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {TestConfigurationService} from './test-config';


/**
 * A model that provides the most common test dependencies, so that they don't have to be provided in each test.
 *
 * Provides the following:
 * - {@link AuthenticationMethodService} replaced with {@link MockAuthenticationMethodService}
 * - {@link ConfigurationService} replaced with {@link TestConfigurationService}
 *
 * Imports the following:
 * - [HttpClientTestingModule]{@link https://angular.io/api/common/http/testing/HttpClientTestingModule}
 */
@NgModule({
    declarations: [],
    imports: [
        HttpClientTestingModule
    ],
    providers: [
        {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
        {provide: ConfigurationService, useClass: TestConfigurationService}
    ]
})
export class TestMockDependenciesModule {
}
