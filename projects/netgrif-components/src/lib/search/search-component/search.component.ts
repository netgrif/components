import {Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {
    AbstractSearchComponent,
    DATE_FORMAT,
    DialogService,
    LoggerService,
    SearchService,
    NAE_SEARCH_COMPONENT_CONFIGURATION,
    NAE_SAVE_FILTER_COMPONENT,
    SearchComponentConfiguration, SideMenuService
} from '@netgrif/application-engine';
import {TranslateService} from '@ngx-translate/core';
import {ComponentType} from '@angular/cdk/portal';

@Component({
    selector: 'nc-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class SearchComponent extends AbstractSearchComponent {

    constructor(searchService: SearchService,
                logger: LoggerService,
                dialogService: DialogService,
                translate: TranslateService,
                sideMenuService: SideMenuService,
                @Optional() @Inject(NAE_SEARCH_COMPONENT_CONFIGURATION) configuration: SearchComponentConfiguration,
                @Optional() @Inject(NAE_SAVE_FILTER_COMPONENT) sideMenuComponent: ComponentType<unknown>) {
        super(searchService, logger, dialogService, translate, sideMenuService, configuration, sideMenuComponent);
    }
}
