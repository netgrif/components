import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    ConfigTaskViewServiceFactory, NextGroupService,
    SearchService,
    SimpleFilter,
    TaskViewService
} from 'netgrif-application-engine';
import {
    HeaderComponent,
} from 'netgrif-components';

const localTaskViewServiceFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('group-view');
};

const searchServiceFactory = (nextGroupService: NextGroupService) => {
    return new SearchService(SimpleFilter.fromTaskQuery({case: {id: nextGroupService.groupOfUser.stringId}}));
};

@Component({
    selector: 'nae-app-group-view-group-view',
    templateUrl: './group-view.component.html',
    styleUrls: ['./group-view.component.scss'],
    providers: [
        ConfigTaskViewServiceFactory,
        {   provide: SearchService,
            useFactory: searchServiceFactory,
            deps: [NextGroupService]
        },
        {   provide: TaskViewService,
            useFactory: localTaskViewServiceFactory,
            deps: [ConfigTaskViewServiceFactory]},
    ]
})
export class GroupViewComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);

    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
