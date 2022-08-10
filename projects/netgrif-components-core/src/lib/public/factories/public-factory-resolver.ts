import {Router} from '@angular/router';
import {UserService} from '../../user/services/user.service';
import {SessionService} from '../../authentication/session/services/session.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {PublicUrlResolverService} from '../services/public-url-resolver.service';

export const publicFactoryResolver = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                      router: Router, publicResolverService: PublicUrlResolverService, privateService, publicService, url?: string) => {
    if (!sessionService.isInitialized) {
        publicResolverService.url = router.url;
        if (url == undefined) {
            router.navigate(['/public-resolver']);
        } else {
            router.navigate([url]);
        }
    } else if (authService.isAuthenticated && userService.user.id !== '' && userService.user.email !== 'anonymous@netgrif.com') {
        return privateService;
    } else {
        return publicService;
    }
};

