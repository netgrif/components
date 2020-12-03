import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
    AbstractTaskView,
    TaskEventNotification,
    TaskViewService,
    CaseResourceService,
    PublicCaseResourceService,
    PublicTaskResourceService,
    ConfigTaskViewServiceFactory,
    SearchService,
    PublicProcessService,
    ProcessService,
    TaskResourceService,
    SimpleFilter,
    FilterType,
    SnackBarService
} from '@netgrif/application-engine';
import {HeaderComponent} from '@netgrif/components';
import {ActivatedRoute, Router} from '@angular/router';

const localTaskViewServiceFactory = (factory: ConfigTaskViewServiceFactory) => {
    return factory.create('demo-public-view');
};

const searchServiceFactory = (router: Router, route: ActivatedRoute, process: ProcessService, snackBarService: SnackBarService) => {
    if (route.snapshot.paramMap.get('caseId') === null && route.snapshot.paramMap.get('petriNetId') !== null) {
        process.getNet(route.snapshot.paramMap.get('petriNetId')).subscribe(net => {
            if (net) {
                const newCase = {
                    title: 'Nový prípad',
                    color: 'panel-primary-icon',
                    netId: net.stringId
                };
                this._caseResourceService.createCase(newCase)
                    .subscribe(response => {
                            router.navigate([route.url, {
                                caseId: response.id,
                                petriNetId: route.snapshot.paramMap.get('petriNetId')
                            }]);
                        }, error => {
                            snackBarService.openErrorSnackBar('Error while creating case ' + error);
                        }
                    );
            } else {
                snackBarService.openWarningSnackBar('Net doesn\'t exists');
            }
        }, errorNet => {
            snackBarService.openErrorSnackBar('Error while requesting net ' + errorNet);
        });
    } else if (route.snapshot.paramMap.get('caseId') !== null) {
        return new SearchService(new SimpleFilter('', FilterType.TASK, {case: {id: route.snapshot.paramMap.get('caseId')}}));
    }
    return new SearchService(new SimpleFilter('', FilterType.TASK, {case: {id: 'No Case'}}));
};

@Component({
    selector: 'nae-app-public-task-view',
    templateUrl: './public-task-view.component.html',
    styleUrls: ['./public-task-view.component.scss'],
    providers: [
        ConfigTaskViewServiceFactory,
        {
            provide: ProcessService,
            useClass: PublicProcessService
        },
        {
            provide: SearchService,
            useFactory: searchServiceFactory,
            deps: [Router, ActivatedRoute, ProcessService, SnackBarService]
        },
        {
            provide: TaskViewService,
            useFactory: localTaskViewServiceFactory,
            deps: [ConfigTaskViewServiceFactory]
        },
        {
            provide: TaskResourceService,
            useClass: PublicTaskResourceService
        },
        {
            provide: CaseResourceService,
            useClass: PublicCaseResourceService
        }
    ]
})
export class PublicTaskViewComponent extends AbstractTaskView implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService) {
        super(taskViewService);
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }

    logEvent(event: TaskEventNotification) {
        console.log(event);
    }
}
