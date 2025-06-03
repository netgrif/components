import {NetgrifApplicationEngine} from '../../commons/schema';

export interface ApplicationConfiguration {
    application: string;
    type: string;
    resolve_configuration?: boolean;
    gateway_url?: string;
    properties?: NetgrifApplicationEngine;
}
