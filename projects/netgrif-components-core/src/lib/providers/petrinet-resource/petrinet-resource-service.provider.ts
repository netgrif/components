
import { Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { PetriNetResourceService } from '../../resources/engine-endpoint/petri-net-resource.service';
import { SessionService } from '../../authentication/session/services/session.service';
import { AuthenticationService } from '../../authentication/services/authentication/authentication.service';
import { PublicUrlResolverService } from '../../public/services/public-url-resolver.service';
import { ResourceProvider } from '../../resources/resource-provider.service';
import { ConfigurationService } from '../../configuration/configuration.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';
import { publicFactoryResolver } from '../../public/factories/public-factory-resolver';
import {
    PublicPetriNetResourceService
} from '../../resources/engine-endpoint/public/public-petri-net-resource.service';


export const PetriNetResourceServiceProvider = {
    provide: PetriNetResourceService,
    useFactory: (userService: UserService,
                 sessionService: SessionService,
                 authService: AuthenticationService,
                 router: Router,
                 publicResolverService: PublicUrlResolverService,
                 provider: ResourceProvider,
                 config: ConfigurationService,
                 redirectService: RedirectService) => {
        return publicFactoryResolver(
            userService,
            sessionService,
            authService,
            router,
            publicResolverService,
            new PetriNetResourceService(provider, config),
            new PublicPetriNetResourceService(provider, config),
            redirectService
        );
    },
    deps: [
        UserService,
        SessionService,
        AuthenticationService,
        Router,
        PublicUrlResolverService,
        ResourceProvider,
        ConfigurationService,
        RedirectService]
}
