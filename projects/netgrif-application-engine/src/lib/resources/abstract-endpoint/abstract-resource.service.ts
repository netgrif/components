import {ResourceProvider} from '../resource-provider.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {Page} from '../interface/page';
import {Pagination} from '../interface/pagination';

/**
 * The class that contains behavior common to all resource services.
 *
 * Mostly endpoint URL resolution and utility functions for response parsing.
 */
export abstract class AbstractResourceService {

    private readonly _SERVER_URL: string;

    /**
     * @param resourceName the identifier of the desired endpoint from configuration, found in
     * {@link SetAuthAndResourcesAddress}.[resources]{@link Resources}.
     * @param _resourceProvider `ResourceProvider` instance
     * @param _configService `ConfigurationService` instance
     */
    protected constructor(resourceName: string,
                          protected _resourceProvider: ResourceProvider,
                          protected _configService: ConfigurationService) {
        this._SERVER_URL = this.getResourceAddress(resourceName);
    }

    protected get SERVER_URL(): string {
        return this._SERVER_URL;
    }

    /**
     * Get URL form nae.json - resources
     * @param name - ID property
     */
    protected getResourceAddress(name: string): string {
        let URL = '';

        const resourcesArray = this._configService.getConfigurationSubtree(['providers', 'resources']);

        if (resourcesArray instanceof Array) {
            resourcesArray.forEach(resource => {
                if (resource.name === name) {
                    URL = resource.address;
                }
            });
        } else {
            if (resourcesArray.name === name) {
                URL = resourcesArray.address;
            }
        }
        return URL;
    }

    /**
     * Parses a response `r` into a {@link Page} instance
     * @param r - response object
     * @param propertiesParams - plural form of the resource name, that is used to extract the data. Eg. "cases".
     */
    protected getResourcePage<T>(r: any, propertiesParams: string): Page<T> {
        if (!r) {
            return r;
        }
        const defaultPage: Pagination = {
            number: -1,
            size: 0,
            totalPages: 0,
            totalElements: 0
        };

        return {
            content: this.changeType<Array<T>>(r, propertiesParams),
            pagination: r.hasOwnProperty('page') ? r.page : defaultPage
        };
    }

    /**
     * Extracts data from the response `r` into an object with better usability.
     * @param r - response object
     * @param propertiesParams - plural form of the resource name, that is used to extract the data. Eg. "cases".
     */
    protected changeType<T>(r: any, propertiesParams: string | undefined): T {
        if (!r) {
            return r;
        }
        if (r.hasOwnProperty('_embedded')) {
            return propertiesParams && r._embedded.hasOwnProperty(propertiesParams) ? r._embedded[propertiesParams] : r._embedded;
        } else {
            return r;
        }
    }
}
