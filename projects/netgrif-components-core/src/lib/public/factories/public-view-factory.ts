import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessService } from '../../process/process.service';
import { CaseResourceService } from '../../resources/engine-endpoint/case-resource.service';
import { SnackBarService } from '../../snack-bar/services/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { PublicTaskLoadingService } from '../../view/task-view/service/public-task-loading.service';
import { SimpleFilter } from '../../filter/models/simple-filter';
import { FilterType } from '../../filter/models/filter-type';
import { mergeMap } from 'rxjs/operators';
import { CreateCaseEventOutcome } from '../../event/model/event-outcomes/case-outcomes/create-case-event-outcome';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../authentication/session/services/session.service';
import { AuthenticationService } from '../../authentication/services/authentication/authentication.service';
import { PublicUrlResolverService } from '../services/public-url-resolver.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';
import { PublicProcessService } from '../../process/public-process.service';
import { PublicCaseResourceService } from '../../resources/engine-endpoint/public/public-case-resource.service';
import { TaskResourceService } from '../../resources/engine-endpoint/task-resource.service';
import { PublicTaskResourceService } from '../../resources/engine-endpoint/public/public-task-resource.service';
import { PetriNetResourceService } from '../../resources/engine-endpoint/petri-net-resource.service';
import {
    PublicPetriNetResourceService
} from '../../resources/engine-endpoint/public/public-petri-net-resource.service';

@Injectable({
    providedIn: 'root'
})
export class PublicViewFactory {

    constructor(protected router: Router,
                protected processService: ProcessService,
                protected publicProcessService: PublicProcessService,
                protected caseResourceService: CaseResourceService,
                protected publicCaseResourceService: PublicCaseResourceService,
                protected taskResourceService: TaskResourceService,
                protected publicTaskResourceService: PublicTaskResourceService,
                protected petriNetResourceService: PetriNetResourceService,
                protected publicPetriNetResourceService: PublicPetriNetResourceService,
                protected snackBarService: SnackBarService,
                protected translate: TranslateService,
                protected sessionService: SessionService,
                protected userService: UserService,
                protected publicResolverService: PublicUrlResolverService,
                protected publicTaskLoadingService: PublicTaskLoadingService,
                protected redirectService: RedirectService,
                protected authService: AuthenticationService) {
    }

    public baseFilter(route: ActivatedRoute) {
        if (route.snapshot.paramMap.get('caseId') === null && route.snapshot.paramMap.get('petriNetId') !== null) {
            this.getNetAndCreateCase(route);
        } else if (route.snapshot.paramMap.get('caseId') !== null) {
            return {
                filter: new SimpleFilter('', FilterType.TASK, {case: {id: route.snapshot.paramMap.get('caseId')}})
            };
        }
        return {
            filter: new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}})
        };
    };

    public getNetAndCreateCase(route: ActivatedRoute) {
        this.publicProcessService.getNet(route.snapshot.paramMap.get('petriNetId')).pipe(mergeMap(net => {
            if (net) {
                this.publicTaskLoadingService.setLoading$(false);
                const newCase = {
                    title: (net.defaultCaseName !== undefined && net.defaultCaseName !== '') ?
                        net.defaultCaseName : this.translate.instant('side-menu.new-case.case'),
                    color: 'panel-primary-icon',
                    netId: net.stringId
                };
                return this.publicCaseResourceService.createCase(newCase);
            } else {
                this.snackBarService.openWarningSnackBar(this.translate.instant('publicView.netNotExist'));
            }
        })).subscribe(response => {
                this.router.navigate([route.snapshot.url.join('/') + '/' + (response.outcome as CreateCaseEventOutcome).aCase.stringId]);
                this.publicTaskLoadingService.setLoading$(false);
            }, error => {
                this.snackBarService.openErrorSnackBar(this.translate.instant('publicView.errorCreate') + error);
                this.publicTaskLoadingService.setLoading$(false);
            }
        );
    };

    public resolveTaskResource(url?: string) {
        return this.publicFactoryResolver(this.taskResourceService, this.publicTaskResourceService, url)
    }

    public resolveCaseResource(url?: string) {
        return this.publicFactoryResolver(this.caseResourceService, this.publicCaseResourceService, url)
    }

    public resolvePetriNetResource(url?: string) {
        return this.publicFactoryResolver(this.petriNetResourceService, this.publicPetriNetResourceService, url)
    }

    public resolveProcessService(url?: string) {
        return this.publicFactoryResolver(this.processService, this.publicProcessService, url)
    }

    private publicFactoryResolver(privateService, publicService, url?: string) {
        if (!this.sessionService.isInitialized) {
            this.publicResolverService.url = this.router.url;
            if (url === undefined) {
                this.router.navigate(['/public-resolver'], {queryParams: this.redirectService.queryParams});
            } else {
                this.router.navigate([url], {queryParams: this.redirectService.queryParams});
            }
        } else if (this.authService.isAuthenticated && this.userService.user.id !== '' && this.userService.user.email !== 'anonymous@netgrif.com') {
            return privateService;
        } else {
            return publicService;
        }
    };

}
