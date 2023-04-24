import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {
    AbstractCaseViewComponent,
    Case,
    CaseViewService,
    SearchService,
    SimpleFilter,
    OverflowService,
    NAE_VIEW_ID_SEGMENT,
    ViewIdService,
    CategoryFactory,
    NAE_SEARCH_CATEGORIES,
    defaultCaseSearchCategoriesFactory,
    NAE_BASE_FILTER,
    AllowedNetsServiceFactory,
    AllowedNetsService,
    UserFilterConstants,
    DataSet,
    FieldTypeResource,
    DataFieldResource,
    DataFieldValue
} from '@netgrif/components-core';
import {HeaderComponent} from '@netgrif/components';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = () => {
    return {
        filter: SimpleFilter.emptyCaseFilter()
    };
};

@Component({
    selector: 'nae-app-case-view',
    templateUrl: './case-view.component.html',
    styleUrls: ['./case-view.component.scss'],
    providers: [
        CategoryFactory,
        CaseViewService,
        SearchService,
        OverflowService,
        {   provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory},
        {   provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]},
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'case'},
        ViewIdService,
        {provide: NAE_SEARCH_CATEGORIES, useFactory: defaultCaseSearchCategoriesFactory, deps: [CategoryFactory]},
    ],
})
export class CaseViewComponent extends AbstractCaseViewComponent implements AfterViewInit {

    @ViewChild('header') public caseHeaderComponent: HeaderComponent;

    additionalFilterData: DataSet;

    constructor(caseViewService: CaseViewService, @Optional() overflowService: OverflowService) {
        super(caseViewService, overflowService, undefined, {
            enableCaseTitle: true,
            isCaseTitleRequired: false,
            newCaseButtonConfig: {
                createCaseButtonTitle: 'test',
                createCaseButtonIcon: 'home'
            }
        });
        this.additionalFilterData = { fields :
                {
                    [UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID]: {
                        type: FieldTypeResource.TEXT,
                        value: {
                            value: 'override'
                        } as DataFieldValue
                    } as DataFieldResource
                }
            } as DataSet;
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.caseHeaderComponent);
    }

    public handleCaseClick(clickedCase: Case): void {
        console.log(clickedCase.stringId);
    }
}
