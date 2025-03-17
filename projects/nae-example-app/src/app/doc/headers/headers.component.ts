import {Component, OnInit} from '@angular/core';
import {
    AllowedNetsService, AllowedNetsServiceFactory,
    NAE_BASE_FILTER,
    SearchService,
    SimpleFilter,
    TaskViewService
} from '@netgrif/components-core';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
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
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
    ],
    standalone: false
})
export class HeadersComponent implements OnInit {

    readonly TITLE = 'Headers';
    readonly DESCRIPTION = 'Ukážka použitia case headeru...';

    constructor() {
    }

    ngOnInit(): void {
    }

}
