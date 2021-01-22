import {ActivatedRoute, Router} from '@angular/router';
import {ProcessService} from '../../process/process.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {getNetAndCreateCase} from './get-net-and-create-case';
import {SearchService} from '../../search/search-service/search.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {FilterType} from '../../filter/models/filter-type';

export const publicSearchServiceFactory = (router: Router, route: ActivatedRoute, process: ProcessService,
                                           caseResourceService: CaseResourceService, snackBarService: SnackBarService) => {
    if (route.snapshot.paramMap.get('caseId') === null && route.snapshot.paramMap.get('petriNetId') !== null) {
        getNetAndCreateCase(router, route, process, caseResourceService, snackBarService);
    } else if (route.snapshot.paramMap.get('caseId') !== null) {
        return new SearchService(new SimpleFilter('', FilterType.TASK, {case: {id: route.snapshot.paramMap.get('caseId')}}));
    }
    return new SearchService(new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}}));
};
