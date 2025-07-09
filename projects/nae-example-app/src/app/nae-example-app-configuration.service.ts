import {Injectable} from '@angular/core';
import {ApplicationConfiguration, ConfigurationService, NetgrifApplicationEngine, ConfigurationResourceService} from '@netgrif/components-core';
import {default as naeConfig} from '../../../../nae.json';
import {environment} from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NaeExampleAppConfigurationService extends ConfigurationService {
    constructor(protected _configurationResource: ConfigurationResourceService) {
        const applicationConfig: ApplicationConfiguration = {
            application: environment.application_identifier,
            type: environment.type_identifier,
            gateway_url: environment.gateway_url,
            resolve_configuration: environment.resolve_configuration
        };
        super(naeConfig as unknown as NetgrifApplicationEngine, _configurationResource, applicationConfig);
    }
}
