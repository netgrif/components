import { TaskResourceService } from '../../resources/engine-endpoint/task-resource.service';
import { LoggerService } from '../../logger/services/logger.service';
import { ResourceProvider } from '../../resources/resource-provider.service';
import { ConfigurationService } from '../../configuration/configuration.service';
import { FieldConverterService } from '../../task-content/services/field-converter.service';

export const TaskResourceServiceProvider = {
    provide: TaskResourceService,
    useFactory: (
        logger: LoggerService,
        provider: ResourceProvider,
        config: ConfigurationService,
        fieldConverter: FieldConverterService) => {
        return new TaskResourceService(provider, config, fieldConverter, logger);
    },
    deps: [
        LoggerService,
        ResourceProvider,
        ConfigurationService,
        FieldConverterService
    ]
}
