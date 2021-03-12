import {Component, OnInit} from '@angular/core';
import {
    CaseViewService,
    CaseViewServiceFactory,
    FilterType, NAE_BASE_FILTER,
    SearchService,
    SimpleFilter,
    TaskViewService
} from '@netgrif/application-engine';

const localCaseViewServiceFactory = (factory: CaseViewServiceFactory) => {
    return factory.createFromConfig('case');
};

const baseFilterFactory = () => {
    return {
        filter: SimpleFilter.emptyCaseFilter()
    };
};

@Component({
    selector: 'nae-app-headers',
    templateUrl: './headers.component.html',
    styleUrls: ['./headers.component.scss'],
    providers: [
        TaskViewService,
        CaseViewServiceFactory,
        SearchService,
        {
            provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [CaseViewServiceFactory]
        },
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory
        },
    ],
})
export class HeadersComponent implements OnInit {

    readonly TITLE = 'Headers';
    readonly DESCRIPTION = 'Ukážka použitia case headeru...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
