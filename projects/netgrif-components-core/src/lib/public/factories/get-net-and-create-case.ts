import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {CreateCaseEventOutcome} from '../../event/model/event-outcomes/case-outcomes/create-case-event-outcome';
import {PublicTaskLoadingService} from '../../view/task-view/service/public-task-loading.service';

export const getNetAndCreateCase = (router: Router,
                                    route: ActivatedRoute,
                                    process: ProcessService,
                                    caseResourceService: CaseResourceService,
                                    snackBarService: SnackBarService,
                                    translate: TranslateService,
                                    publicTaskLoadingService: PublicTaskLoadingService) => {
    process.getNet(route.snapshot.paramMap.get('petriNetId')).pipe(mergeMap(net => {
        if (net) {
            publicTaskLoadingService.setLoading$(true);
            const newCase = {
                title: (net.defaultCaseName !== undefined && net.defaultCaseName !== '') ?
                    net.defaultCaseName : translate.instant('side-menu.new-case.case'),
                color: 'panel-primary-icon',
                netId: net.stringId
            };
            return caseResourceService.createCase(newCase);
        } else {
            snackBarService.openWarningSnackBar(translate.instant('publicView.netNotExist'));
        }
    })).subscribe(response => {
            router.navigate([route.snapshot.url.join('/') + '/' + (response.outcome as CreateCaseEventOutcome).aCase.stringId]);
            publicTaskLoadingService.setLoading$(false);
        }, error => {
            snackBarService.openErrorSnackBar(translate.instant('publicView.errorCreate') + error);
            publicTaskLoadingService.setLoading$(false);
        }
    );
};
