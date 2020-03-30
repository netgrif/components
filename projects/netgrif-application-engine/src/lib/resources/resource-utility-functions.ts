import {Resource} from '../configuration/interfaces/schema';

export function changeType<T>(r: any, propertiesParams: string): T {
    if (r.hasOwnProperty('_embedded')) {
        if (propertiesParams) {
            if (r._embedded.hasOwnProperty(propertiesParams)) {
                return r._embedded[propertiesParams];
            } else {
                return r._embedded;
            }
        } else {
            return r._embedded;
        }
    } else {
        return r;
    }
}


export function getResourceAddress(name: string, resourcesArray: any): string {
    let url = '';
    if (resourcesArray instanceof Array) {
        resourcesArray.forEach(resource => {
            if (resource.name === name) {
                url = resource.address;
            }
        });
    } else {
        if (resourcesArray.name === name) {
            url =  resourcesArray.address;
        }
    }
    return url;
}
