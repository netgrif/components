import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {getNetAndCreateCase} from './get-net-and-create-case';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {TranslateService} from '@ngx-translate/core';
import {PublicTaskLoadingService} from '../../view/task-view/service/public-task-loading.service';

export const CASE_ID = "caseId";
export const PETRI_NET_ID = "petriNetId"
export const TRANSITION_ID = "transitionId"

export const publicBaseFilterFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                                        caseResourceService: CaseResourceService, snackBarService: SnackBarService,
                                        translate: TranslateService, publicTaskLoadingService: PublicTaskLoadingService) => {
    const caseId = route.snapshot.paramMap.get(CASE_ID)
    const petriNetId = route.snapshot.paramMap.get(PETRI_NET_ID)
    const transId = route.snapshot.paramMap.get(TRANSITION_ID)
    if (caseId === null && petriNetId !== null) {
        getNetAndCreateCase(router, route, process, caseResourceService, snackBarService, translate, publicTaskLoadingService);
    } else if (caseId !== null && transId !== null) {
        return {
            filter: new SimpleFilter('', FilterType.TASK, {case: {id: caseId}, transitionId: transId})
        };
    } else if (caseId !== null) {
        return {
            filter: new SimpleFilter('', FilterType.TASK, {case: {id: caseId}})
        };
    }
    return {
        filter: new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}})
    };
};
