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
