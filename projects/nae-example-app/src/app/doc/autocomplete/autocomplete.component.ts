import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CaseResourceService,
    CategoryFactory,
    defaultTaskSearchCategoriesFactory,
    FilterType,
    NAE_ASYNC_RENDERING_CONFIGURATION,
    NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    NAE_VIEW_ID_SEGMENT,
    ProcessService,
    SearchService,
    SimpleFilter,
    SnackBarHorizontalPosition,
    SnackBarService,
    SnackBarVerticalPosition,
    TaskViewService,
    ViewIdService
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createFromArray(['autocomplete']);
};

const baseFilterFactory = (processService: ProcessService) => {
    return {
        filter: processService.getNet('autocomplete').pipe(map(net => SimpleFilter.fromQuery({
            process: {identifier: net.stringId}
        }, FilterType.TASK))),
        filterType: FilterType.TASK
    };
};

@Component({
    selector: 'nae-app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [
        CategoryFactory,
        TaskViewService,
        SearchService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory,
            deps: [ProcessService]
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {
            provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'task'
        },
        ViewIdService,
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: defaultTaskSearchCategoriesFactory,
            deps: [CategoryFactory]
        },
        {
            provide: NAE_ASYNC_RENDERING_CONFIGURATION,
            useValue: {enableAsyncRenderingForNewFields: false, enableAsyncRenderingOnTaskExpand: false}
        }
    ]
})
export class AutocompleteComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService,
                private _translate: TranslateService,
                private _snackbar: SnackBarService,
                private _caseResourceService: CaseResourceService,
                private _processService: ProcessService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    public createNewCase(): void {
        this._processService.getNet('autocomplete').subscribe(net => {
            if (!net) {
                this._snackbar.openErrorSnackBar(this._translate.instant('autocomplete.createCaseError'),
                    SnackBarVerticalPosition.BOTTOM, SnackBarHorizontalPosition.CENTER);
                return;
            }
            const newCase = {
                title: net.defaultCaseName,
                color: 'panel-primary-icon',
                netId: net.stringId
            };
            this._caseResourceService.createCase(newCase).subscribe(() => {
                this.taskViewService.reload();
            });
        });
    }
}
