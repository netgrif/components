/**
 * Change type
 * @param r - input type
 * @param propertiesParams - plural property
 */
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
