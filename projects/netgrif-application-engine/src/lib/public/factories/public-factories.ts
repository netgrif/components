import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {UserService} from '../../user/services/user.service';
import {SessionService} from '../../authentication/session/services/session.service';
import {AuthenticationService} from '../../authentication/services/authentication/authentication.service';
import {SearchService} from '../../search/search-service/search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {PublicUrlResolverService} from '../services/public-url-resolver.service';

export const getNetAndCreateCase = (router: Router,
                                    route: ActivatedRoute,
                                    process: ProcessService,
                                    caseResourceService: CaseResourceService,
                                    snackBarService: SnackBarService) => {
    process.getNet(route.snapshot.paramMap.get('petriNetId')).subscribe(net => {
        if (net) {
            const newCase = {
                title: 'Nový prípad',
                color: 'panel-primary-icon',
                netId: net.stringId
            };
            caseResourceService.createCase(newCase)
                .subscribe(response => {
                        router.navigate([route.snapshot.url.join('/') + '/' + response.stringId]);
                    }, error => {
                        snackBarService.openErrorSnackBar('Error while creating case ' + error);
                    }
                );
        } else {
            snackBarService.openWarningSnackBar('Net doesn\'t exists');
        }
    }, errorNet => {
        snackBarService.openErrorSnackBar('Error while requesting net ' + errorNet);
    });
};

export const publicFactoryResolver = (userService: UserService, sessionService: SessionService, authService: AuthenticationService,
                                      router: Router, publicResolverService: PublicUrlResolverService, privateService, publicService) => {
    if (!sessionService.isInitialized) {
        publicResolverService.url = router.url;
        router.navigate(['/public-resolver']);
    } else if (authService.isAuthenticated && userService.user.id !== '' && userService.user.email !== 'anonymous@netgrif.com') {
        return privateService;
    } else {
        return publicService;
    }
};

export const publicSearchServiceFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                                           caseResourceService: CaseResourceService, snackBarService: SnackBarService) => {
    if (route.snapshot.paramMap.get('caseId') === null && route.snapshot.paramMap.get('petriNetId') !== null) {
        getNetAndCreateCase(router, route, process, caseResourceService, snackBarService);
    } else if (route.snapshot.paramMap.get('caseId') !== null) {
        return new SearchService(new SimpleFilter('', FilterType.TASK, {case: {id: route.snapshot.paramMap.get('caseId')}}));
    }
    return new SearchService(new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}}));
};
