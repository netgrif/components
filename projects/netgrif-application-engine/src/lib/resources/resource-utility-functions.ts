/**
 * Change type
 * @param r - input type
 * @param propertiesParams - plural property
 */
import {Page} from './interface/page';
import {Pagination} from './interface/pagination';

export function changeType<T>(r: any, propertiesParams: string): T {
    if (!r) {
        return r;
    }
    if (r.hasOwnProperty('_embedded')) {
        return propertiesParams && r._embedded.hasOwnProperty(propertiesParams) ? r._embedded[propertiesParams] : r._embedded;
    } else {
        return r;
    }
}

export function getResourcePage<T>(r: any, propertiesParams: string): Page<T> {
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
        content: changeType<Array<T>>(r, propertiesParams),
        pagination: r.hasOwnProperty('page') ? r.page : defaultPage
    };
}

/**
 * Get URL form nae.json - resources
 * @param name - ID property
 * @param resourcesArray - Resources
 */
export function getResourceAddress(name: string, resourcesArray: any): string {
    let URL = '';
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
