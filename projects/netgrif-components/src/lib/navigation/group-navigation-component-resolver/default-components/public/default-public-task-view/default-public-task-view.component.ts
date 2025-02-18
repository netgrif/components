import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractTaskViewComponent,
    AllowedNetsService,
    AllowedNetsServiceFactory, BaseFilterFactoryProvider, CaseResourceServiceProvider, ChangedFieldsService,
    NAE_VIEW_ID_SEGMENT,
    ProcessServiceProvider, PublicTaskLoadingService, SearchService, TaskResourceServiceProvider, TaskViewService, ViewIdService} from '@netgrif/components-core';
import {combineLatest} from "rxjs";
import {map} from "rxjs/operators";
import {HeaderComponent} from "../../../../../header/header.component";

const localAllowedNetsServiceFactory = (factory: AllowedNetsServiceFactory, route: ActivatedRoute) => {
    const array = [];
    if (route.snapshot.paramMap.get('petriNetId') !== null) {
        array.push(route.snapshot.paramMap.get('petriNetId'));
    }
    return factory.createFromArray(array);
};

@Component({
    selector: 'nc-default-public-task-view',
    templateUrl: './default-public-task-view.component.html',
    styleUrls: ['./default-public-task-view.component.scss'],
    providers: [
        TaskViewService,
        PublicTaskLoadingService,
        SearchService,
        ChangedFieldsService,
        ProcessServiceProvider,
        TaskResourceServiceProvider,
        CaseResourceServiceProvider,
        BaseFilterFactoryProvider,
        {
            provide: AllowedNetsService,
            useFactory: localAllowedNetsServiceFactory,
            deps: [AllowedNetsServiceFactory, ActivatedRoute]
        },
        {provide: NAE_VIEW_ID_SEGMENT, useValue: 'publicView'},
        {provide: AllowedNetsServiceFactory, useClass: AllowedNetsServiceFactory},
        ViewIdService,
    ]
})
export class DefaultPublicTaskViewComponent extends AbstractTaskViewComponent implements AfterViewInit {

    @ViewChild('header') public taskHeaderComponent: HeaderComponent;

    constructor(taskViewService: TaskViewService, publicTaskLoadingService: PublicTaskLoadingService,
                activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
        this.loading$ = combineLatest(taskViewService.loading$, publicTaskLoadingService.loading$).pipe(
            map(sources => {
                return sources[0] || sources[1];
            })
        );
    }

    ngAfterViewInit(): void {
        this.initializeHeader(this.taskHeaderComponent);
    }
}
