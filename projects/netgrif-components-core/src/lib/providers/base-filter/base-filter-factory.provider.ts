import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NAE_BASE_FILTER } from '../../search/models/base-filter-injection-token';
import { publicBaseFilterFactory } from '../../public/factories/public-search-factory';
import { ProcessService } from '../../process/process.service';
import { CaseResourceService } from '../../resources/engine-endpoint/case-resource.service';
import { SnackBarService } from '../../snack-bar/services/snack-bar.service';
import { PublicTaskLoadingService } from '../../view/task-view/service/public-task-loading.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';

export const BaseFilterFactoryProvider = {
    provide: NAE_BASE_FILTER,
    useFactory: publicBaseFilterFactory,
    deps: [
        Router,
        ActivatedRoute,
        ProcessService,
        CaseResourceService,
        SnackBarService,
        TranslateService,
        PublicTaskLoadingService,
        RedirectService
    ]
}
