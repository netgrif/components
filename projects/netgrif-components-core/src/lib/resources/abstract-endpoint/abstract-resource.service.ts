import {ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Page} from '../interface/page';
import {Pagination} from '../interface/pagination';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {User} from "../../user/models/user";

/**
 * The class that contains behavior common to all resource services.
 *
 * Mostly endpoint URL resolution and utility functions for response parsing.
 */
export abstract class AbstractResourceService {

    private _SERVER_URL: string;
    private readonly resourceName: string;

    /**
     * @param resourceName the identifier of the desired endpoint from configuration, found in
     * {@link SetAuthAndResourcesAddress}.[resources]{@link Resources}.
     * @param _resourceProvider `ResourceProvider` instance
     * @param configurationService `ConfigurationService` instance
     */
    protected constructor(resourceName: string,
                          protected _resourceProvider: ResourceProvider,
                          protected configurationService: ConfigurationService) {
        this.resourceName = resourceName;
    }

    protected get SERVER_URL(): string {
        if (!this._SERVER_URL) {
            this._SERVER_URL = this.getResourceAddress(this.resourceName);
        }
        return this._SERVER_URL;
    }

    /**
     * Get URL form nae.json - resources
     * @param name - ID property
     */
    protected getResourceAddress(name: string): string {
        let URL = '';

        const resourcesArray = this.configurationService.getConfigurationSubtree(['providers', 'resources']);

        if (resourcesArray instanceof Array) {
            resourcesArray.forEach(resource => {
                if (resource.name === name) {
                    URL = resource.address;
                }
            });
        } else if (resourcesArray && resourcesArray.name === name) {
            URL = resourcesArray.address;
        }
        return URL;
    }

    /**
     * Parses a response `response` into a {@link Page} instance
     * @param response - response object
     * @param propertiesParams - plural form of the resource name, that is used to extract the data. Eg. "cases".
     */
    protected getResourcePage<T>(response: any, propertiesParams: string): Page<T> {
        if (!response) {
            return response;
        }
        const defaultPage: Pagination = {
            number: -1,
            size: 0,
            totalPages: 0,
            totalElements: 0
        };

        return {
            content: this.changeType<Array<T>>(response, propertiesParams),
            pagination: response.hasOwnProperty(PaginationParams.PAGE_NUMBER) ? response.page : defaultPage
        };
    }

    /**
     * Extracts data from the response `response` into an object with better usability.
     * @param response - response object
     * @param propertiesParams - plural form of the resource name, that is used to extract the data. Eg. "cases".
     */
    protected changeType<T>(response: any, propertiesParams: string): T {
        if (!response) {
            return response;
        }
        if (response.hasOwnProperty('_embedded')) {
            return propertiesParams && response._embedded.hasOwnProperty(propertiesParams)
                ? response._embedded[propertiesParams]
                : response._embedded;
        } else {
            return response;
        }
    }

    /**
     * Converts a Spring-style paginated response into the application's Page<T> format.
     * @param response The raw response from backend (Spring `PageImpl` structure).
     * @returns Converted Page<T> object.
     */
    protected mapToPage<T>(response: any): Page<T> {
        if (!response || !response.content) {
            return {
                content: [],
                pagination: {
                    size: 0,
                    totalElements: 0,
                    totalPages: 0,
                    number: 0
                }
            };
        }

        return {
            content: response.content,
            pagination: {
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                number: response.number
            }
        };
    }

    protected resolvePublicEndpoint(endpoint: string, user: User): string {
        if (!!user && user.isAnonymous()) {
            if (endpoint.includes('/')) {
                const slashIndex = endpoint.indexOf('/');
                return endpoint.replace(endpoint.substring(slashIndex, slashIndex + 1), '/public/');
            }
            return endpoint + '/public';
        }
        return endpoint;
    }
}
