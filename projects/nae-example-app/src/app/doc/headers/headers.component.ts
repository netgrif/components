import {Component, OnInit} from '@angular/core';
import {
    CaseViewService,
    CaseViewServiceFactory,
    FilterType,
    SearchService,
    SimpleFilter,
    TaskViewService
} from '@netgrif/application-engine';

const localCaseViewServiceFactory = (factory: CaseViewServiceFactory) => {
    return factory.create('case');
};

const searchServiceFactory = () => {
    // TODO load/use base filter somehow
    return new SearchService(new SimpleFilter('', FilterType.CASE, {}));
};

@Component({
    selector: 'nae-app-headers',
    templateUrl: './headers.component.html',
    styleUrls: ['./headers.component.scss'],
    providers: [
        TaskViewService,
        CaseViewServiceFactory,
        {
            provide: CaseViewService,
            useFactory: localCaseViewServiceFactory,
            deps: [CaseViewServiceFactory]
        },
        {
            provide: SearchService,
            useFactory: searchServiceFactory
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
