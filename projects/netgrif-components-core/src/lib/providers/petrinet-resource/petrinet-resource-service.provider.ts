import { PetriNetResourceService } from '../../resources/engine-endpoint/petri-net-resource.service';
import { ResourceProvider } from '../../resources/resource-provider.service';
import { ConfigurationService } from '../../configuration/configuration.service';

export const PetriNetResourceServiceProvider = {
    provide: PetriNetResourceService,
    useFactory: (provider: ResourceProvider,
                 config: ConfigurationService) => {
        return new PetriNetResourceService(provider, config);
    },
    deps: [
        ResourceProvider,
        ConfigurationService]
}
