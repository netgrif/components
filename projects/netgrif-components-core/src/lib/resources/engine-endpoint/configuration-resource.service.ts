import {Injectable} from '@angular/core';
import {ResourceProvider} from '../resource-provider.service';
import {ApplicationConfiguration} from '../../configuration/application-configuration';
import {Observable} from 'rxjs';

/**
 * @class ConfigurationResourceService
 * @description Service responsible for retrieving frontend application configurations via HTTP requests.
 * Provides a RESTful interface for accessing public application configuration endpoints.
 *
 * @injectable Provided at root level for application-wide singleton instance
 */
@Injectable({
    providedIn: 'root'
})
export class ConfigurationResourceService {

    /**
     * Base URL segment for configuration resource endpoints
     */
    private readonly RESOURCE_URL: string = "frontend-config";

    /**
     * URL segment identifier for public configuration endpoints
     */
    private readonly PUBLIC_SUFFIX: string = "public";

    constructor(protected _provider: ResourceProvider) {}

    /**
     * Retrieves public application configuration from the backend
     *
     * @param {ApplicationConfiguration} configuration - Configuration object containing application metadata
     * @returns {Observable<ApplicationConfiguration>} Observable that emits the public application configuration
     *
     * @description Makes a GET request to /frontend-config/public/{app}/{type} endpoint
     * Uses the provided gateway URL from the configuration object
     */
    public getPublicApplicationConfiguration(configuration: ApplicationConfiguration): Observable<ApplicationConfiguration> {
        return this._provider.get$(
            `/${this.RESOURCE_URL}/${this.PUBLIC_SUFFIX}/${configuration.application}/${configuration.type}`,
            configuration.gateway_url
        );
    }
}
