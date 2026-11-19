import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigurationService, LoggerService, ViewService} from '@netgrif/components-core';

/**
 * `ViewService` of the playground. The tab view and the navigation need one, the playground has no views
 * configured in `nae.json`, so no view classes are registered.
 */
@Injectable()
export class PlaygroundViewService extends ViewService {
    constructor(configurationService: ConfigurationService, router: Router, loggerService: LoggerService) {
        super([], configurationService, router, loggerService);
    }
}
