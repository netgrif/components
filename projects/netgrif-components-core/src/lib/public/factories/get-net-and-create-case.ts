import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {EMPTY} from 'rxjs';
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
    process.getNet(atob(route.snapshot.paramMap.get('petriNetId'))).pipe(mergeMap(net => {
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
            return EMPTY;
        }
    })).subscribe(response => {
            const aCase = (response?.outcome as CreateCaseEventOutcome)?.aCase;
            publicTaskLoadingService.setLoading$(false);
            if (!aCase) {
                snackBarService.openErrorSnackBar(translate.instant('publicView.errorCreate') + (response?.error ?? ''));
                return;
            }
            router.navigate([...route.snapshot.url.map(segment => segment.path), aCase.stringId]);
        }, error => {
            snackBarService.openErrorSnackBar(translate.instant('publicView.errorCreate') + error);
            publicTaskLoadingService.setLoading$(false);
        }
    );
};
