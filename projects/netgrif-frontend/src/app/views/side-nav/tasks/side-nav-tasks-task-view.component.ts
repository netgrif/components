import {
    AfterViewInit,
    Component,
    ViewChild,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    AbstractTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory,
    CategoryFactory,
    ChangedFieldsService,
    defaultTaskSearchCategoriesFactory,
    NAE_BASE_FILTER,
    NAE_SEARCH_CATEGORIES,
    NAE_VIEW_ID_SEGMENT,
    SearchService,
    SimpleFilter,
    TaskViewService,
    ViewIdService
} from '@netgrif/components-core';
import { HeaderComponent } from '@netgrif/components';

const localAllowedNetsFactory = (factory: AllowedNetsServiceFactory) => {
    return factory.createWithAllNets();
};

const baseFilterFactory = () => {
    return {
        filter: SimpleFilter.emptyTaskFilter()
    };
};

/**
 * Tasks of all processes (menu item "Tasks" of nae.json).
 */
@Component({
    selector: 'app-side-nav-tasks-task-view',
    templateUrl: './side-nav-tasks-task-view.component.html',
    styleUrls: ['./side-nav-tasks-task-view.component.scss'],
    providers: [
        CategoryFactory,
        SearchService,
        TaskViewService,
        ChangedFieldsService,
        {
            provide: NAE_BASE_FILTER,
            useFactory: baseFilterFactory
        },
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsFactory,
            deps: [AllowedNetsServiceFactory]
        },
        {
            provide: NAE_VIEW_ID_SEGMENT,
            useValue: 'tasks'
        },
        ViewIdService,
        {
            provide: NAE_SEARCH_CATEGORIES,
            useFactory: defaultTaskSearchCategoriesFactory,
            deps: [CategoryFactory]
        }
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SideNavTasksTaskViewComponent extends AbstractTaskViewComponent
    implements AfterViewInit {
    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
