import {Component} from '@angular/core';
import {
    CaseViewService,
    CaseViewServiceFactory,
    FilterType,
    NAE_DEFAULT_HEADERS,
    OverflowService,
    SearchService,
    ViewIdService,
} from '@netgrif/application-engine';
import {EulohySearchService} from '../../../../../search/eulohy-search-service';
import {SprPPFilterHelperService} from '../../../../../filters/sprpp/sprpp-filter-helper.service';

const localCaseViewServiceFactory = (factory: CaseViewServiceFactory) => {
    return factory.createFromConfig('portal/sprpp/groupTasksPP');
};

const searchServiceFactory = (sprppFilterHelper: SprPPFilterHelperService) => {
    return new EulohySearchService(sprppFilterHelper.getFilter('groupTasks-SprPP'), FilterType.CASE);
};

@Component({
    selector: 'app-portal-sprpp-grouptaskspp-content1-case-view',
    template: '<app-case-view-pp></app-case-view-pp>',
    providers: [
        CaseViewServiceFactory,
        OverflowService,
        ViewIdService,
        {
            provide: SearchService,
            useFactory: searchServiceFactory,
            deps: [SprPPFilterHelperService]
        },
        {
            provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [CaseViewServiceFactory]
        },
        {
            provide: NAE_DEFAULT_HEADERS, useValue: [
                'meta-creationDate',
                'union_sprpp-note',
                'union_sprpp-xCislozmluvy1',
                'union_sprpp-assignee',
                'union_sprpp-xTypdokumentunazov',
                'meta-title']
        }
    ]
})
export class PortalSprPPGroupTasksPPContent1CaseViewComponent {
}
