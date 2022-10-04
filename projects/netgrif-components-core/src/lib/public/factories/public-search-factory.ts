import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {getNetAndCreateCase} from './get-net-and-create-case';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';
import {TranslateService} from '@ngx-translate/core';
import {PublicTaskLoadingService} from '../../view/task-view/service/public-task-loading.service';

/**
 * @deprecated in 6.3.0 - user {@link PublicViewFactory#baseFilter}
 * */
export const publicBaseFilterFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                                        caseResourceService: CaseResourceService, snackBarService: SnackBarService,
                                        translate: TranslateService, publicTaskLoadingService: PublicTaskLoadingService) => {
    if (route.snapshot.paramMap.get('caseId') === null && route.snapshot.paramMap.get('petriNetId') !== null) {
        getNetAndCreateCase(router, route, process, caseResourceService, snackBarService, translate, publicTaskLoadingService);
    } else if (route.snapshot.paramMap.get('caseId') !== null) {
        return {
            filter: new SimpleFilter('', FilterType.TASK, {case: {id: route.snapshot.paramMap.get('caseId')}})
        };
    }
    return {
        filter: new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}})
    };
};
