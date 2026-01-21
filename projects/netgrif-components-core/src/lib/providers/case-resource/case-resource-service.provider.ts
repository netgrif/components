
import { CaseResourceService } from '../../resources/engine-endpoint/case-resource.service';
import { ResourceProvider } from '../../resources/resource-provider.service';
import { ConfigurationService } from '../../configuration/configuration.service';

export const CaseResourceServiceProvider = {
    provide: CaseResourceService,
    useFactory: (provider: ResourceProvider,
                 config: ConfigurationService) => {
        return new CaseResourceService(provider, config);
    },
    deps: [
        ResourceProvider,
        ConfigurationService,
    ]
}
