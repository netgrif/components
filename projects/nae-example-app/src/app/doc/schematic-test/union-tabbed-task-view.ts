import {Component} from '@angular/core';
import {
    TaskViewServiceFactory,
    Filter,
    FilterType,
    InjectedTabbedTaskViewData,
    MergeOperator,
    NAE_TAB_DATA,
    NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
    SearchService,
    tabbedTaskViewServiceFactory,
    Task,
    TaskViewService
} from '@netgrif/application-engine';
import {ReplaySubject} from 'rxjs';
import {EulohySearchService} from '../../../../../search/eulohy-search-service';
import {SprPPFilterHelperService} from '../../../../../filters/sprpp/sprpp-filter-helper.service';

const searchServiceFactory = (sprppFilterHelper: SprPPFilterHelperService, injectedTabData: InjectedTabbedTaskViewData) => {
    const stream$ = new ReplaySubject<Filter>();
    sprppFilterHelper.getFilter('groupTasks-task-SprPP').subscribe(filter => {
        stream$.next(filter.merge(injectedTabData.baseFilter, MergeOperator.AND));
        stream$.complete();
    });
    return new EulohySearchService(stream$, FilterType.TASK);
};

const disableButtonsFactory = () => {
    return {
        finish: (t: Task) => {
            if (t && t.dataGroups && t.dataGroups.length) {
                for (const dg of t.dataGroups) {
                    const fld = dg.fields.find(field => field.title === 'PozastavenÃ¡');
                    if (fld) {
                        return fld.value;
                    }
                }
            }
            return false;
        }
    };
};

@Component({
    selector: 'app-portal-sprpp-grouptaskspp-content0-task-view',
    template: '<app-task-view-pp></app-task-view-pp>',
    providers: [
        TaskViewServiceFactory,
        {
            provide: SearchService,
            useFactory: searchServiceFactory,
            deps: [SprPPFilterHelperService, NAE_TAB_DATA]
        },
        {
            provide: TaskViewService,
            useFactory: tabbedTaskViewServiceFactory,
            deps: [TaskViewServiceFactory, NAE_TAB_DATA]
        },
        {
            provide: NAE_TASK_PANEL_DISABLE_BUTTON_FUNCTIONS,
            useFactory: disableButtonsFactory
        }
    ]
})
export class PortalSprPPGroupTasksPPContent0TaskViewComponent {
}
