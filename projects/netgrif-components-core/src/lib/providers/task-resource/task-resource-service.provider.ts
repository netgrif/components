import { Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { TaskResourceService } from '../../resources/engine-endpoint/task-resource.service';
import { SessionService } from '../../authentication/session/services/session.service';
import { AuthenticationService } from '../../authentication/services/authentication/authentication.service';
import { PublicUrlResolverService } from '../../public/services/public-url-resolver.service';
import { LoggerService } from '../../logger/services/logger.service';
import { ResourceProvider } from '../../resources/resource-provider.service';
import { ConfigurationService } from '../../configuration/configuration.service';
import { FieldConverterService } from '../../task-content/services/field-converter.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';
import { publicFactoryResolver } from '../../public/factories/public-factory-resolver';
import { PublicTaskResourceService } from '../../resources/engine-endpoint/public/public-task-resource.service';
import {ValidationLoaderService} from "../../registry/validation/validation-loader.service";

export const TaskResourceServiceProvider = {
    provide: TaskResourceService,
    useFactory: (
        userService: UserService,
        sessionService: SessionService,
        authService: AuthenticationService,
        router: Router,
        publicResolverService: PublicUrlResolverService,
        logger: LoggerService,
        provider: ResourceProvider,
        config: ConfigurationService,
        fieldConverter: FieldConverterService,
        redirectService: RedirectService) => {
        return publicFactoryResolver(
            userService,
            sessionService,
            authService,
            router,
            publicResolverService,
            new TaskResourceService(provider, config, fieldConverter, logger),
            new PublicTaskResourceService(provider, config, fieldConverter, logger),
            redirectService
        );
    },
    deps: [
        UserService,
        SessionService,
        AuthenticationService,
        Router,
        PublicUrlResolverService,
        LoggerService,
        ResourceProvider,
        ConfigurationService,
        FieldConverterService,
        RedirectService,
        ValidationLoaderService]
}
