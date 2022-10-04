
import { Router } from '@angular/router';
import { ProcessService } from '../../process/process.service';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../authentication/session/services/session.service';
import { AuthenticationService } from '../../authentication/services/authentication/authentication.service';
import { PublicUrlResolverService } from '../../public/services/public-url-resolver.service';
import { PetriNetResourceService } from '../../resources/engine-endpoint/petri-net-resource.service';
import { PublicPetriNetResourceService } from '../../resources/engine-endpoint/public/public-petri-net-resource.service';
import { LoggerService } from '../../logger/services/logger.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';
import { publicFactoryResolver } from '../../public/factories/public-factory-resolver';
import { PublicProcessService } from '../../process/public-process.service';

export const ProcessServiceProvider = {
    provide: ProcessService,
    useFactory: (userService: UserService,
                 sessionService: SessionService,
                 authService: AuthenticationService,
                 router: Router,
                 publicResolverService: PublicUrlResolverService,
                 petriNetResource: PetriNetResourceService,
                 publicPetriNetResource: PublicPetriNetResourceService,
                 loggerService: LoggerService,
                 redirectService: RedirectService) => {
        return publicFactoryResolver(
            userService,
            sessionService,
            authService,
            router,
            publicResolverService,
            new ProcessService(petriNetResource, loggerService),
            new PublicProcessService(publicPetriNetResource, loggerService),
            redirectService
        );
    },
    deps: [UserService, SessionService, AuthenticationService, Router, PublicUrlResolverService, PetriNetResourceService,
        PublicPetriNetResourceService, LoggerService, RedirectService]
}
